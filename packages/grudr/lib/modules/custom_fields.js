import React from 'react';
import { Posts } from './posts/index.js';
import FormsUpload from 'meteor/vulcan:forms-upload';
import Users from "meteor/vulcan:users";
import { userRole, gender, medicalCollege, certification, affiliation, awards } from './data';

const formGroups = {
  admin: {
    name: 'admin',
    label: 'Admin',
    order: 60,
    // startCollapsed: true
  },
  general: {
    name: 'general',
    label: 'General',
    order: 10
  },
  profession: {
    name: 'profession',
    label: 'Profession',
    order: 20,
    // startCollapsed: true
  },
  roles: {
    name: 'roles',
    label: 'Roles',
    order: 30
  },
};

/*
#### Posts fields #######################################
*/
Posts.removeField('url');


/*
#### Users fields #######################################
*/
Users.addField([
  {
    fieldName: 'userRole',
    fieldSchema: {
      type: String,
      control: "radiogroup",
      mustComplete: true,
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      form: {
        options: userRole
      },
      group: formGroups.roles,
      order: 5
    }
  },
  {
    fieldName: 'isDoctor',
    fieldSchema: {
      type: Boolean,
      control: "checkbox",
      optional: true,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['guests'],
      group: formGroups.admin,
      order: 7
    }
  },

  // General ==========================
  {
    fieldName: 'avatarUrl',
    fieldSchema: {
      type: String,
      // mustComplete: true,
      // required: true,
      optional: true,
      viewableBy: ['guests'],
      insertableBy: ['members'],
      editableBy: ['members'],
      control: FormsUpload, // use the FormsUpload form component
      form: {
        options: {
          preset: 'avatar'
        }
      },
      group: formGroups.general,
      order: 1
    }
  },
  {
  fieldName: 'displayName',
    fieldSchema: {
      group: formGroups.general,
      order: 2
    }
  },
  {
  fieldName: 'email',
    fieldSchema: {
      insertableBy: ['guests'],
      editableBy: ['admins'],
      group: formGroups.general,
      order: 3
    }
  },
  {
    fieldName: 'mobileNumber',
    fieldSchema: {
      type: String,
      control: "number",
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['members'],
      group: formGroups.general,
      order: 4
    }
  },
  {
    fieldName: 'gender',
    fieldSchema: {
      type: String,
      control: "radiogroup",
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['members'],
      form: {
        options: gender
      },
      group: formGroups.general,
      order: 5
    }
  },
  

  // Profession =========================
  // {
  //   fieldName: 'college',
  //   fieldSchema: {
  //     type: String,
  //     control: "select",
  //     optional: true,
  //     insertableBy: ['members'],
  //     editableBy: ['members'],
  //     viewableBy: ['members'],
  //     form: {
  //       options: medicalCollege
  //     },
  //     group: formGroups.profession,
  //     order: 1
  //   }
  // },
  {
  fieldName: 'professionalLicenseNumber',
    fieldSchema: {
      type: String,
      // mustComplete: true,
      optional: true,
      control: "text",
      viewableBy: ['admins'],
      insertableBy: ['members'],
      editableBy: ['members'],
      group: formGroups.profession,
      order: 2
    }
  },
  {
    fieldName: 'certification',
    fieldSchema: {
      type: String,
      control: "checkboxgroup",
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['members'],
      form: {
        options: certification
      },
      group: formGroups.profession,
      order: 3
    }
  },
  {
    fieldName: 'affiliation',
    fieldSchema: {
      type: String,
      control: "checkboxgroup",
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['members'],
      form: {
        options: affiliation
      },
      group: formGroups.profession,
      order: 4
    }
  },
  {
    fieldName: 'awards',
    fieldSchema: {
      type: String,
      control: "checkboxgroup",
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['members'],
      form: {
        options: awards
      },
      group: formGroups.profession,
      order: 5
    }
  },

  {
    fieldName: 'newsletter_subscribeToNewsletter',
    fieldSchema: {
      type: Boolean,
      optional: true,
      hidden: true
    }
  },
]);

Users.removeField('bio');
Users.removeField('htmlBio');
Users.removeField('twitterUsername');
Users.removeField('website');

const originalAvatarConstructor = Users.avatar;

// extends the Users.avatar function
Users.avatar = {
  ...originalAvatarConstructor,
  getUrl(user) {
    url = originalAvatarConstructor.getUrl(user);

    return !!user && user.avatar ? user.avatar : url;
  },
};
