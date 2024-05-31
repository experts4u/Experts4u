// export const ValidationTypes = {
//     "Email" : "EMPTY",
//     "MobileNumber" : "MOBILE_NUMBER",
//     "Empty" : "EMPTY",
//     "Password" : "PASSWORD"
// }

// const Regexp = {
//     [ValidationTypes.Email] : /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
//     [ValidationTypes.MobileNumber] : /^[+]?[0-9]{10,20}$/,
//     [ValidationTypes.Empty] : /d+/
// }

// function Validate({type,value}){

// }

// function ValidateList(){

// }
import ToastHelper from 'Utils/ToastMessage';
import emojiRegex from 'emoji-regex';
let emoji_reg_exp = emojiRegex();
export const ValidationTypes = {
  Email: 'email',
  Empty: 'empty',
  Password: 'password',
  Mobile: 'mobile',
  date: 'date',
  Image: 'Image',
};
// function validURL(str) {
//   var pattern = new RegExp(
//     "^(https?:\\/\\/)?" + // protocol
//       "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//       "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
//       "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//       "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//       "(\\#[-a-z\\d_]*)?$",
//     "i"
//   ); // fragment locator
//   return !!pattern.test(str);
// }
export const Validate = (type = ValidationTypes, value) => {
  if (type == ValidationTypes.Email) {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(value)) {
      return true;
    } else {
      return false;
    }
  }
  if (type == ValidationTypes.Empty) {
    if (
      value &&
      value.toString().trim().length &&
      !new RegExp(emoji_reg_exp).test(value.toString().trim())
    ) {
      return true;
    }
    if (!value) {
      return false;
    }
    return false;
  }
  if (type == ValidationTypes.Password) {
    if (value.toString().trim().length < 8) {
      return false;
    } else {
      return true;
    }
  }

  if (type == ValidationTypes.Mobile) {
    return new RegExp('^[+]?[0-9]{10,20}$').test(value);
  }

  if (type == ValidationTypes.MultipleWord) {
    return true;
  }
  if (type == ValidationTypes.Gender) {
    if (value === null) {
      return false;
    } else {
      return true;
    }
  }
  if (type == ValidationTypes.Image) {
    if (value === null) {
      return false;
    } else {
      return true;
    }
  }
};

export const ValidateList = async list => {
  let count = 0;
  for await (let item of list) {
    if (item[1]) {
      if (!Validate(item[1], item[0])) {
        ToastHelper.Error(item[2]);

        count++;
        break;
      }
    } else {
      if (!item[0]) {
        ToastHelper.Error(item[2]);
        count++;
        break;
      }
    }
  }
  if (count > 0) {
    return false;
  } else {
    return true;
  }
};
