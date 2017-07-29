import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Auth } from 'app/shared/auth/auth.service';
import { Customer } from 'app/shared/models/customer';
import { AccessType } from 'app/shared/models/enums/access-type';
import { HairMenu } from 'app/shared/models/hair-menu';
import { HairSubMenu } from 'app/shared/models/hair-sub-menu';
import { HairType } from 'app/shared/models/hair-type';
import { Post } from 'app/shared/models/post';
import { PostHairMenu } from 'app/shared/models/post-hair-menu';
import { PostHairType } from 'app/shared/models/post-hair-type';
import { PostInfo } from 'app/shared/models/post-info';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UploadCategoryType } from '../../shared/models/enums/upload-category-type';
import { UploadFileType } from '../../shared/models/enums/upload-file-type';
import { ImagePathPipe } from '../../shared/pipes/image-path.pipe';
import * as Reducers from '../../shared/reducers';
import * as SharedActions from '../../shared/shared-actions';
import * as PostActions from '../shared/post-actions';
import { PostUploadInfo } from '../shared/post-upload-info';
import { PostUploadInfoType } from '../shared/post-upload-info-type';

function customWatcher(c: AbstractControl) {
  // if (!c.get('password') || !c.get('password_confirm')) {
  //   return null;
  // };

  // let result = {};
  // if (c.get('password').value !== c.get('password_confirm').value) {
  //   result = { ...result, 'password nomatch': true }
  // }

  // return result;
  return null;
}

@Component({
  selector: 'hb-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PostComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput') fileInput;

  isProgressSpinner$: Observable<boolean>;

  postForm: FormGroup;

  hairSubMenuColors: HairSubMenu[];
  hairSubMenuPerms: HairSubMenu[];

  hairMenus: HairMenu[] = [];
  hairTypes: HairType[] = [];

  hairMenusSubscription: Subscription;
  hairTypesSubscription: Subscription;
  customerSubscription: Subscription;
  activatedRouteSubscription: Subscription;
  postSubscription: Subscription;

  accessTypes = [];
  uploadCategoryTypes = [];
  filteredCustomers$: Observable<Customer[]>;
  customers: Customer[];
  selectedCustomerId: number;
  isSelectedCustomer: boolean;

  postUploadInfos: PostUploadInfo[] = [];
  postUploadInfoType = PostUploadInfoType;

  post: Post;
  isEdit = false;

  constructor(public auth: Auth, private fb: FormBuilder, private store: Store<Reducers.State>, private activatedRoute: ActivatedRoute, private location: Location) {
    this.isProgressSpinner$ = store.select(Reducers.sharedIsProgressSpinner);

    Object.keys(AccessType).forEach((x, i) => {
      if (i > 1) {
        this.accessTypes.push(x);
      }
    });

    Object.keys(UploadCategoryType).forEach((x, i) => {
      if (i > 1) {
        this.uploadCategoryTypes.push(x);
      }
    });

    this.postForm = this.fb.group({
      accessType: [2, Validators.required],
      customer: ['', Validators.required],
      date: [new Date().toLocaleDateString(), Validators.required],
      memo: '',
      hairMenus: [false, Validators.requiredTrue],
      hairTypes: [false, Validators.requiredTrue],
      hairTypeMemo: '',
      hairSubMenuColor: 2,
      hairSubMenuColorMemo: '',
      hairSubMenuPerm: 8,
      hairSubMenuPermMemo: ''
    }, { validator: customWatcher });

    this.hairMenusSubscription = this.store.select(Reducers.postHairMenus).subscribe(x => {
      if (x) {
        this.hairMenus = x;
        const color = x.find(y => y.name === 'Color');
        if (color) {
          this.hairSubMenuColors = color.hairSubMenus;
        }

        const perm = x.find(y => y.name === 'Perm');
        if (perm) {
          this.hairSubMenuPerms = perm.hairSubMenus;
        }
      }
    });

    this.hairTypesSubscription = this.store.select(Reducers.postHairTypes).subscribe(x => {
      if (x) {
        this.hairTypes = x;
      }
    });

    this.customerSubscription = this.store.select(Reducers.postCustomers).subscribe(x => {
      if (x) {
        this.customers = x;
        this.filteredCustomers$ = this.postForm.get('customer').valueChanges
          .startWith(null)
          .map(name => this.filterCustomers(name));
      }
    });

    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(params => {
      const postId = params['postId'];
      if (postId !== undefined) {
        console.log(postId);
        this.isEdit = true;

        this.postSubscription = this.store.select(Reducers.sharedSelectedPost).subscribe(post => {
          if (post) {
            console.log('edit : ', post);
            this.post = post;

            const color = post.postHairMenus.find(y => y.hairMenu.name === 'Color');
            const perm = post.postHairMenus.find(y => y.hairMenu.name === 'Perm');

            this.postForm.patchValue({
              accessType: post.accessType,
              customer: {
                name: post.customer.name,
                customerId: post.customerId
              },
              date: post.date,
              memo: post.memo,
              hairMenus: post.postHairMenus.length > 0 ? true : false,
              hairTypes: post.postHairTypes.length > 0 ? true : false,
              hairTypeMemo: post.hairTypeMemo,
              hairSubMenuColor: color === undefined ? 0 : color.hairSubMenuId,
              hairSubMenuColorMemo: color === undefined ? 0 : color.memo,
              hairSubMenuPerm: perm === undefined ? 0 : perm.hairSubMenuId,
              hairSubMenuPermMemo: perm === undefined ? 0 : perm.memo
            });

            this.selectedCustomerId = post.customerId;

            this.hairMenus.forEach(hairMenu => {
              const postHairMenu = post.postHairMenus.find(x => x.hairMenuId === hairMenu.hairMenuId);
              if (postHairMenu) {
                hairMenu.postHairMenu = postHairMenu;
                hairMenu.isChecked = true;
              } else {
                hairMenu.isChecked = false;
              }
            });

            this.hairTypes.forEach(hairType => {
              const postHairType = post.postHairTypes.find(x => x.hairTypeId === hairType.hairTypeId);
              if (postHairType) {
                hairType.isChecked = true;
                hairType.postHairType = postHairType;
              } else {
                hairType.isChecked = false;
              }
            });

            // file Uploads
            this.postUploadInfos = [];
            post.postUploads.forEach(postUpload => {
              const imagePathPipe = new ImagePathPipe();
              this.postUploadInfos.push(new PostUploadInfo({
                postUploadId: postUpload.postUploadId,
                memo: postUpload.memo === undefined ? '' : postUpload.memo,
                postUploadBlob: imagePathPipe.transform(postUpload.path, null),
                uploadCategoryType: postUpload.uploadCategoryType,
                postUploadInfoType: PostUploadInfoType.Update
              }));
            });

          }
        });
        this.store.dispatch(new SharedActions.GetPost(+postId));
      }
    });

  }

  onChangeAccessType(event) {
    console.log(event);

    this.postForm.patchValue({
      accessType: event.value
    });
  }

  onChangeHairMenus(event) {
    console.log(event);
    const hairMenu = this.hairMenus.find(x => x.hairMenuId === event.value);
    if (hairMenu) {
      hairMenu.isChecked = event.source.checked;
    }
    const isChecked = this.hairMenus.filter(x => x.isChecked === true).length;
    this.postForm.patchValue({
      hairMenus: isChecked > 0
    });
  }

  onChangeHairTypes(event) {
    console.log(event);
    const hairType = this.hairTypes.find(x => x.hairTypeId === event.value);
    if (hairType) {
      hairType.isChecked = event.source.checked;
    }
    const isChecked = this.hairTypes.filter(x => x.isChecked === true).length;
    this.postForm.patchValue({
      hairTypes: isChecked > 0
    });
  }

  onChangedCustomer(event) {
    if (!this.isSelectedCustomer) {
      this.selectedCustomerId = 0;
    }
    this.isSelectedCustomer = false;
  }

  onSelectCustomer(event) {
    if (event.isUserInput) {
      this.selectedCustomerId = event.source.value.customerId;
      this.isSelectedCustomer = true;
      console.log(event.source.value);
    }
  }

  filterCustomers(val: Customer | string) {
    let value: string;

    if (val) {
      if ((<Customer>val).name) {
        value = (<Customer>val).name.toLowerCase();
      } else {
        value = (<string>val);
      }
      return this.customers.filter(x => x.name.toLowerCase().indexOf(value) === 0);
    } else {
      return this.customers;
    }
  }

  onDisplayCustomer(customer: Customer): string {
    return customer ? customer.name : '';
  }

  ngOnInit() {
    this.store.dispatch(new PostActions.GetHairMenus());
    this.store.dispatch(new PostActions.GetHairTypes());
    this.store.dispatch(new PostActions.GetCustomers(this.auth.userId));

    // This page is not reloaded
    if (performance.navigation.type !== 1) {
      // prevent search again when I go back to users or explorers.
    }
    // todo: move here !!
    this.store.dispatch(new SharedActions.SetIsPreventRefreshingPosts(true));
  }

  ngOnDestroy(): void {
    this.hairMenusSubscription.unsubscribe();
    this.hairTypesSubscription.unsubscribe();
    this.customerSubscription.unsubscribe();
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
    if (this.activatedRouteSubscription) {
      this.activatedRouteSubscription.unsubscribe();
    }
  }

  onBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.postForm.valid) {
      const postId = this.post ? this.post.postId : 0;

      const post = <Post>{
        accessType: this.postForm.get('accessType').value,
        date: this.postForm.get('date').value,
        memo: this.postForm.get('memo').value,
        hairTypeMemo: this.postForm.get('hairTypeMemo').value,
        postHairMenus: [],
        postHairTypes: [],
        postId: postId,
        createdUserId: this.post ? this.post.createdUserId : this.auth.userId,
        createdDate: this.post ? this.post.createdDate : null,
        updatedUserId: this.isEdit ? this.auth.userId : null,
        updatedDate: this.isEdit ? this.post ? this.post.updatedDate : null : null
      };

      // new customer
      if (this.selectedCustomerId === 0) {
        post.customer = <Customer>{
          name: this.postForm.get('customer').value,
        };
      } else {
        post.customerId = this.postForm.get('customer').value.customerId;
      }

      this.hairMenus.forEach(x => {
        if (x.isChecked) {
          const postHairMenu = <PostHairMenu>{
            hairMenuId: x.hairMenuId,
            postId: postId,
            postHairMenuId: x.postHairMenu ? x.postHairMenu.postHairMenuId : 0,
            createdUserId: x.postHairMenu ? x.postHairMenu.createdUserId : this.auth.userId,
            createdDate: x.postHairMenu ? x.postHairMenu.createdDate : null
          };
          if (x.name === 'Color') {
            postHairMenu.hairSubMenuId = this.postForm.get('hairSubMenuColor').value;
            postHairMenu.memo = this.postForm.get('hairSubMenuColorMemo').value;
          } else if (x.name === 'Perm') {
            postHairMenu.hairSubMenuId = this.postForm.get('hairSubMenuPerm').value;
            postHairMenu.memo = this.postForm.get('hairSubMenuPermMemo').value;
          }

          post.postHairMenus.push(postHairMenu);
        }
      });

      this.hairTypes.forEach(x => {
        if (x.isChecked) {
          const postHairType = <PostHairType>{
            hairTypeId: x.hairTypeId,
            postId: postId,
            postHairTypeId: x.postHairType ? x.postHairType.postHairTypeId : 0,
            createdUserId: x.postHairType ? x.postHairType.createdUserId : this.auth.userId,
            createdDate: x.postHairType ? x.postHairType.createdDate : null
          };

          post.postHairTypes.push(postHairType);
        }
      });

      const postInfo = <PostInfo>{
        post: post,
        postUploadInfo: this.postUploadInfos
      }

      if (this.isEdit) {
        this.store.dispatch(new PostActions.EditPost(postInfo));
      } else {
        this.store.dispatch(new PostActions.AddPost(postInfo));
      }

    }
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files) {
      for (let i = 0; i < fileInput.target.files.length; i++) {
        const file = fileInput.target.files[i];
        const reader = new FileReader();

        reader.onload = (event: any) => {
          this.postUploadInfos.push(new PostUploadInfo({
            postUploadFile: file,
            postUploadBlob: event.target.result,
            uploadCategoryType: UploadCategoryType.Before,
            uploadFileType: UploadFileType.Image,
            postUploadInfoType: PostUploadInfoType.Add
          }));
        }

        // reader.onloadend = function () {

        //   const exif = EXIF.readFromBinaryFile(new BinaryFile(this.result));

        //   switch (exif.Orientation) {

        //     case 8:
        //       ctx.rotate(90 * Math.PI / 180);
        //       break;
        //     case 3:
        //       ctx.rotate(180 * Math.PI / 180);
        //       break;
        //     case 6:
        //       ctx.rotate(-90 * Math.PI / 180);
        //       break;


        //   }
        // };

        reader.readAsDataURL(file);
      }
    }
  }

  onDelPostUploadInfo(i: number) {
    if (this.postUploadInfos[i].postUploadInfoType === PostUploadInfoType.Add) {
      this.postUploadInfos.splice(i, 1);
    } else {
      this.postUploadInfos[i].postUploadInfoType = PostUploadInfoType.Delete;
    }
  }

  get existsHairMenusColor(): boolean {
    const color = this.hairMenus.find(y => y.name === 'Color');
    if (color) {
      return color.isChecked
    }
    return false;
  };

  get existsHairMenusPerm(): boolean {
    const perm = this.hairMenus.find(y => y.name === 'Perm');
    if (perm) {
      return perm.isChecked
    }
    return false;
  };

}
