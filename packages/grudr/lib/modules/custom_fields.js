import React from 'react';
// import Tags from 'meteor/vulcan:forms-tags';
import { Posts } from './posts/index.js';
import { Questions } from './questions/index.js';
import Users from "meteor/vulcan:users";
import FormsUpload from 'meteor/vulcan:forms-upload';
import { userRole, gender, areaPractise, medicalCollege, certification, affiliation, awards } from './data';
import TinyMCE from 'react-tinymce';

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
    order: 20
  },
  profession: {
    name: 'profession',
    label: 'Profession',
    order: 30,
    // startCollapsed: true
  },
  consultation: {
    name: 'consultation',
    label: 'Consultation',
    order: 40,
    startCollapsed: true
  },
  social: {
    name: 'social',
    label: 'Social',
    order: 50,
    startCollapsed: true
  },
  roles: {
    name: 'roles',
    label: 'Roles',
    order: 60
  },
};

/*
#### Posts fields #######################################
*/
Posts.addField([
  {
    fieldName: 'title',
    fieldSchema: {
      max: 80,
      limit: 80
    }
  },
  {
    fieldName: 'body',
    fieldSchema: {
      max: 6000,
      limit: 6000,
      // control: TinyMCE
    }
  },
  // {
  //   fieldName: 'categories',
  //   fieldSchema: {
  //     type: Array,
  //     optional: true,
  //     control: Tags,
  //     // afterComponent: <a target="_blank" className="suggest-category-link" href="https://github.com/SachaG/SidebarFeedback/issues/1">Suggest new categories</a>
  //   }
  // },
  {
    fieldName: 'thumbnailUrl',
    fieldSchema: {
      type: String,
      optional: true,
      viewableBy: ['guests'],
      insertableBy: ['members'],
      editableBy: ['members'],
      control: FormsUpload, // use the FormsUpload form component
      form: {
        options: {
          preset: 'article_thumbnail'
        },
      },
      hidden: false
    }
  }
]);

Posts.removeField('url');


/*
#### Questions fields #######################################
*/
Questions.addField([
  {
    fieldName: 'title',
    fieldSchema: {
      limit: 3000
    }
  },
  // {
  //   fieldName: 'categories',
  //   fieldSchema: {
  //     type: Array,
  //     optional: true,
  //     control: Tags,
  //     // afterComponent: <a target="_blank" className="suggest-category-link" href="https://github.com/SachaG/SidebarFeedback/issues/1">Suggest new categories</a>
  //   }
  // },
  {
    fieldName: 'thumbnailUrl',
    fieldSchema: {
      type: String,
      optional: true,
      viewableBy: ['guests'],
      insertableBy: ['members'],
      editableBy: ['members'],
      control: FormsUpload, // use the FormsUpload form component
      form: {
        options: {
          preset: 'article_thumbnail'
        },
      },
      hidden: false
    }
  }
]);


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
    fieldName: 'userRolePrefix',
    fieldSchema: {
      type: String,
      optional: true,
      viewableBy: ['guests'],
      group: formGroups.roles,
      order: 6
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
  {
    fieldName: 'isWriter',
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
  fieldName: 'bio',
    fieldSchema: {
      group: formGroups.general,
      order: 2
    }
  },
  {
    fieldName: 'mobileNumber',
    fieldSchema: {
      type: String,
      control: "text",
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['members'],
      group: formGroups.general,
      order: 3
    }
  },
  {
  fieldName: 'email',
    fieldSchema: {
      insertableBy: ['guests'],
      editableBy: ['admins'],
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
  {
    fieldName: 'college',
    fieldSchema: {
      type: String,
      control: "select",
      optional: true,
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['members'],
      form: {
        options: medicalCollege
      },
      group: formGroups.general,
      order: 6
    }
  },
    {
  fieldName: 'city',
    fieldSchema: {
      type: String,
      optional: true,
      viewableBy: ['guests'],
      insertableBy: ['members'],
      editableBy: ['members'],
      group: formGroups.general,
      order: 7
    }
  },
  {
  fieldName: 'state',
    fieldSchema: {
      type: String,
      optional: true,
      viewableBy: ['guests'],
      insertableBy: ['members'],
      editableBy: ['members'],
      group: formGroups.general,
      order: 8
    }
  },
  {
  fieldName: 'country',
    fieldSchema: {
      type: String,
      optional: true,
      viewableBy: ['guests'],
      insertableBy: ['members'],
      editableBy: ['members'],
      group: formGroups.general,
      order: 9
    }
  },

  // Profession =========================
  {
  fieldName: 'professionalLicenseNumber',
    fieldSchema: {
      type: String,
      // mustComplete: true,
      optional: true,
      control: "text",
      viewableBy: ['admins'],
      insertableBy: ['doctors'],
      editableBy: ['doctors'],
      group: formGroups.profession,
      order: 1
    }
  },
  // {
  //   fieldName: 'categories',
  //   fieldSchema: {
  //     // type: Array,
  //     // mustComplete: true,
  //     optional: true,
  //     // control: 'select',
  //     insertableBy: ['doctors'],
  //     editableBy: ['doctors'],
  //     viewableBy: ['members'],
  //     // afterComponent: <span className="suggest-list">Ex: Dentist</span>,
  //     form: {
  //       options: areaPractise
  //     },
  //     group: formGroups.profession,
  //     order: 2
  //   }
  // },
  {
    fieldName: 'certification',
    fieldSchema: {
      type: String,
      control: "select",
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
      control: "select",
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
      control: "select",
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
