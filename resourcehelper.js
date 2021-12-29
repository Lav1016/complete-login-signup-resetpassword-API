var msg_update_code = '200';
var msg_update_text = 'Record updated successfully';
var exception_msg_code = '400';
var exception_msg_text = 'something went wrong ';
var msg_save_code = '200';
var msg_save_text = 'Record saved successfully';
var unprocessable_code = '422';
var notfound_code = '404';
var notfound_text = 'Records does not exist';
var msg_delete_text = 'Record deleted successfully';
var msg_approved_text = 'Record approved successfully';
var msg_reject_text = 'Record reject successfully.';
var Unauthorized = '401';
var password_not_exist = 'Password does not match';
var password_verify = 'Password verify sucessfully';
var duplicate_code = '409';
var duplicate_email = 'Duplicate e-mail address';
var server_error = '500';
var email_sender_error = 'Error in e-mail sender id';
var duplicate_email_phone = 'Duplicate e-mail id or phone number';
var session_expire = 'Your session has been expired';
var password_updated = 'Password already updated or wrong e-mail id';
var email_not_exist = "Email does not exist.";
var token_expired = 'Token expired or new password should be diffrent';
var password_changed = 'Password has been changed successfully';
var valid_email_msg = 'Please enter valid e-mail id';
var email_inbox_msg = 'Please check your mail and change you password by click on the link';
var password_compare = 'New Password Should be diffrent from old password';
var user_record = 'User record does not exist';
var error_master = 'Please enter search value';
var project_exist ="Project already exist Please change Name";
var similar_password ="password  and confirm password does not match";
var success_msg = "Login  successfully";
var OTP_msg = "One Time Password send successfully";
var OTP_success_msg ="One Time Password has been send";
var OTP_matched = "Please enter correct One Time password"
var Password_update ="your password is update successfully ";
var password_msg ="Please enter correct password";
var password_match= " password does not matched ";
var findRecord ="Some record has been Found!";
var docusign_status = "Docusigned Successfully Send Mail to Client";
var project_msg ="'project already assigned";




module.exports = {
    msg_update_code: msg_update_code,
    msg_update_text: msg_update_text,
    exception_msg_code: exception_msg_code,
    exception_msg_text: exception_msg_text,
    msg_save_code: msg_save_code,
    msg_save_text: msg_save_text,
    unprocessable_code: unprocessable_code,
    notfound_code: notfound_code,
    notfound_text: notfound_text,
    msg_delete_text: msg_delete_text,
    msg_approved_text: msg_approved_text,
    msg_reject_text: msg_reject_text,
    Unauthorized: Unauthorized,
    password_not_exist: password_not_exist,
    password_verify: password_verify,
    duplicate_code: duplicate_code,
    duplicate_email: duplicate_email,
    server_error: server_error,
    email_sender_error: email_sender_error,
    duplicate_email_phone: duplicate_email_phone,
    session_expire: session_expire,
    password_updated: password_updated,
    email_not_exist: email_not_exist,
    token_expired: token_expired,
    password_changed: password_changed,
    valid_email_msg: valid_email_msg,
    email_inbox_msg: email_inbox_msg,
    password_compare: password_compare,
    user_record: user_record,
    error_master: error_master,
    project_exist:project_exist,
    similar_password:similar_password,
    success_msg:success_msg,
    OTP_msg:OTP_msg,
    OTP_success_msg:OTP_success_msg,
    OTP_matched:OTP_matched,
    Password_update:Password_update,
    password_msg:password_msg,
    findRecord:findRecord,
    password_match:password_match,
    docusign_status:docusign_status,
    project_msg:project_msg
    
};
