import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormArray } from '@angular/forms';
import { PostHairMenu } from 'app/shared/models/post-hair-menu';
import { HairMenu } from 'app/shared/models/hair-menu';
import { AccessType } from 'app/shared/models/enums/access-type';
import { HairType } from 'app/shared/models/hair-type';
import { HairSubMenu } from 'app/shared/models/hair-sub-menu';
import { Store } from '@ngrx/store';
import * as Reducers from '../../shared/reducers';
import { Observable } from 'rxjs/Observable';
import { back } from '@ngrx/router-store';

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
export class PostComponent implements OnInit {

  postForm: FormGroup;
  public isSubmitted: boolean;

  constructor(private fb: FormBuilder, private store: Store<Reducers.State>) {
    this.postForm = this.fb.group({
      accessType: AccessType,
      customer: fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        customerId: 0,
      }),
      date: Date,
      memo: '',
      hairMenus: fb.array([
        new HairMenu({ name: 'Cut' }),
        new HairMenu({ name: 'Color', hairSubMenus: [new HairSubMenu({ hairSubMenuId: 1, name: 'Full Color' }), new HairSubMenu({ hairSubMenuId: 4, name: 'Babo Color' })] }),
        new HairMenu({ name: 'Perm', hairSubMenus: [new HairSubMenu({ hairSubMenuId: 2, name: 'Digital Perm' }), new HairSubMenu({ hairSubMenuId: 3, name: 'Raw Perm' })] }),
      ]),
      hairTypes: fb.array([
        new HairType({ name: 'Thin' }),
        new HairType({ name: 'Thick' })
      ]),
      hairTypeMemo: '',
      hairSubMenuColor: 0,
      hairSubMenuColorMemo: '',
      hairSubMenuPerm: 0,
      hairSubMenuPermMemo: '',
    }, { validator: customWatcher });
  }

  get hairMenus(): FormArray {
    return this.postForm.get('hairMenus') as FormArray;
  };
  get hairTypes(): FormArray {
    return this.postForm.get('hairTypes') as FormArray;
  };
  get hairSubMenuColors(): HairSubMenu[] {
    const formArray = this.postForm.get('hairMenus') as FormArray;
    const hairMenu = formArray.value[1];
    if (hairMenu) {
      return hairMenu.hairSubMenus;
    } else {
      return [];
    }
  }
  get hairSubMenuPerms(): HairSubMenu[] {
    const formArray = this.postForm.get('hairMenus') as FormArray;
    const hairMenu = formArray.value[2];
    if (hairMenu) {
      return hairMenu.hairSubMenus;
    } else {
      return [];
    }
  }

  ngOnInit() {
    // const aa = this.postForm.get('hairMenus') as FormArray;
    // const gg = aa.at(0).value.name;
    //  this.postForm.get('customer').get('name')
  }

  onBack() {
    this.store.dispatch(back());
  }

  onSubmit() {
    if (this.postForm.valid) {
      // const user = <User>{
      //   userId: this.user.userId,
      //   userKey: this.user.userKey,
      //   userName: this.user.userName,
      //   // password: string;
      //   email: this.editForm.get('email').value,
      //   // image: string;
      //   name: this.editForm.get('name').value,

      //   gender: this.editForm.get('gender').value,
      //   birthday: this.editForm.get('birthday').value,
      //   phone: this.editForm.get('phone').value,

      //   // salonId: number | null;
      // };
      // this.store.dispatch(new UserActions.EditUser(user));
    }
  }

}
