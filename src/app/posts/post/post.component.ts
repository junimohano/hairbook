import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { back } from '@ngrx/router-store';
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

import * as Reducers from '../../shared/reducers';
import * as SharedActions from '../../shared/shared-actions';
import * as PostActions from '../shared/post-actions';

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

  postForm: FormGroup;
  isSubmitted: boolean;

  hairSubMenuColors: HairSubMenu[];
  hairSubMenuPerms: HairSubMenu[];

  hairMenus: HairMenu[];
  hairTypes: HairType[];

  hairMenusSubscription: Subscription;
  hairTypesSubscription: Subscription;
  customerSubscription: Subscription;
  activatedRouteSubscription: Subscription;
  postSubscription: Subscription;

  accessTypes = [];
  filteredCustomers$: Observable<Customer[]>;
  customers: Customer[];
  selectedCustomerId: number;
  isSelectedCustomer: boolean;

  constructor(public auth: Auth, private fb: FormBuilder, private store: Store<Reducers.State>, private activatedRoute: ActivatedRoute) {
    Object.keys(AccessType).forEach((x, i) => {
      if (i > 2) {
        this.accessTypes.push(x);
      }
    });

    this.postForm = this.fb.group({
      accessType: ['', Validators.required],
      customer: ['', Validators.required],
      date: ['', Validators.required],
      memo: '',
      hairMenus: [false, Validators.requiredTrue],
      hairTypes: [false, Validators.requiredTrue],
      hairTypeMemo: '',
      hairSubMenuColor: 0,
      hairSubMenuColorMemo: '',
      hairSubMenuPerm: 0,
      hairSubMenuPermMemo: '',
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

        this.postSubscription = this.store.select(Reducers.sharedSelectedPost).subscribe(post => {
          if (post) {
            console.log('edit : ', post);
            this.postForm.patchValue({
              memo: post.memo
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
    this.store.dispatch(new PostActions.GetCustomers(this.auth.userId));
    this.store.dispatch(new PostActions.GetHairMenus());
    this.store.dispatch(new PostActions.GetHairTypes());
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
    const aa = this.postForm;
    this.store.dispatch(back());
  }

  onSubmit() {
    if (this.postForm.valid) {
      const post = <Post>{
        accessType: this.postForm.get('accessType').value,
        date: this.postForm.get('date').value,
        memo: this.postForm.get('memo').value,
        hairTypeMemo: this.postForm.get('hairTypeMemo').value,
        createdUserId: this.auth.userId,
        postHairMenus: [],
        postHairTypes: []
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
            createdUserId: this.auth.userId,
            hairMenuId: x.hairMenuId
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
            createdUserId: this.auth.userId,
            hairTypeId: x.hairTypeId
          };
          post.postHairTypes.push(postHairType);
        }
      });

      const postInfo = <PostInfo>{
        post: post,
        postUploads: []
      }
      const fi = this.fileInput.nativeElement;
      for (let i = 0; i < fi.files.length; i++) {
        const file = fi.files[i];
        postInfo.postUploads.push(file);
      }

      this.store.dispatch(new PostActions.AddPost(postInfo));
    }
  }

  addFile() {

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
