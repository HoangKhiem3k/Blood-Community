import db, { sequelize } from "../models/index";
import authController from "../controllers/authController";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();
import emailService from "./emailService";
const Op = require("Sequelize").Op;
let getNotifyForRecipientService = async (recipientId) => {
  try {
    let notifiesInfor = {};
    let notifies = await db.Notify.findAll({
      where: {
        recipientId,
        recipientDeleted: "0",
        type: "donor_confirm",
      },
    });
    if (!notifies) {
      notifiesInfor.statusCode = 404;
      notifiesInfor.message = "Không tìm thấy!";
      notifiesInfor.content = {};
    } else {
      notifiesInfor.statusCode = 200;
      notifiesInfor.message = "Lấy thông tin thành công!";
      notifiesInfor.content = notifies;
    }
    return notifiesInfor;
  } catch (e) {
    console.log(e);
  }
};
let getNotifyForDonorService = async (donorId) => {
  try {
    let notifiesInfor = {};
    let notifies = await db.Notify.findAll({
      where: {
        donorId,
        donorDeleted: "0",
        type: {
          [Op.or]: ["recipient_confirm_failed", "recipient_confirm_success"],
        },
      },
    });
    if (!notifies) {
      notifiesInfor.statusCode = 404;
      notifiesInfor.message = "Không tìm thấy!";
      notifiesInfor.content = {};
    } else {
      notifiesInfor.statusCode = 200;
      notifiesInfor.message = "Lấy thông tin thành công!";
      notifiesInfor.content = notifies;
    }
    return notifiesInfor;
  } catch (e) {
    console.log(e);
  }
};
let getAllRequestByRecipientIdService = async (id) => {
  try {
    let requestsInfor = {};
    let requests = await db.Request.findAll({
      where: {
        recipientId: id,
      },
    });
    if (!requests) {
      requestsInfor.statusCode = 404;
      requestsInfor.message = "Không tìm thấy!";
      requestsInfor.content = {};
    } else {
      requestsInfor.statusCode = 200;
      requestsInfor.message = "Lấy thông tin thành công!";
      requestsInfor.content = requests;
    }
    return requestsInfor;
  } catch (e) {
    console.log(e);
  }
};
let getAllRequestByGroupBloodService = async (groupBlood) => {
  try {
    let requestsInfor = {};
    let requests = await db.Request.findAll({
      where: {
        groupBlood,
      },
      include: [
        {
          model: db.User,
          as: "recipientData",
        },
      ],
      raw: true,
      nest: true,
    });
    if (!requests) {
      requestsInfor.statusCode = 404;
      requestsInfor.message = "Không tìm thấy!";
      requestsInfor.content = {};
    } else {
      requestsInfor.statusCode = 200;
      requestsInfor.message = "Lấy thông tin thành công!";
      requestsInfor.content = requests;
    }
    return requestsInfor;
  } catch (e) {
    console.log(e);
  }
};
let recipientConfirmRequestSuccessService = async (data) => {
  try {
    let requestUpdated = {};
    let checkRequestId = await db.Request.findOne({
      where: { id: data.id },
      raw: false,
    });
    if (checkRequestId) {
      checkRequestId.status = "S3";
      await checkRequestId.save();
      let getRequestInforAgain = await db.Request.findOne({
        where: { id: data.id },
        raw: true,
      });
      requestUpdated.content = getRequestInforAgain;
      requestUpdated.statusCode = 200;
      requestUpdated.message = "Người nhận máu đã xác nhận thành công!";
    } else {
      requestUpdated.statusCode = 404;
      requestUpdated.message = "Không tìm thấy!";
    }
    return requestUpdated;
  } catch (e) {
    console.log("err donor confirm: ", e);
  }
};
let recipientConfirmRequestFailedService = async (data) => {
  try {
    let requestUpdated = {};
    let checkRequestId = await db.Request.findOne({
      where: { id: data.id },
      raw: false,
    });
    if (checkRequestId) {
      checkRequestId.status = "S1";
      await checkRequestId.save();
      let getRequestInforAgain = await db.Request.findOne({
        where: { id: data.id },
        raw: true,
      });
      requestUpdated.content = getRequestInforAgain;
      requestUpdated.statusCode = 200;
      requestUpdated.message =
        "Người nhận máu đã xác nhận nhận máu không thành công!";
    } else {
      requestUpdated.statusCode = 404;
      requestUpdated.message = "Không tìm thấy!";
    }
    return requestUpdated;
  } catch (e) {
    console.log("err donor confirm: ", e);
  }
};
let donorConfirmRequestService = async (data) => {
  try {
    let requestUpdated = {};
    let checkRequestId = await db.Request.findOne({
      where: { id: data.id },
      raw: false,
    });
    if (checkRequestId) {
      checkRequestId.status = "S2";
      checkRequestId.donorId = data.donorId;
      await checkRequestId.save();
      let getRequestInforAgain = await db.Request.findOne({
        where: { id: data.id },
        raw: true,
      });
      requestUpdated.content = getRequestInforAgain;
      requestUpdated.statusCode = 200;
      requestUpdated.message = "Người hiến máu đã xác nhận thành công!";
    } else {
      requestUpdated.statusCode = 404;
      requestUpdated.message = "Không tìm thấy!";
    }
    return requestUpdated;
  } catch (e) {
    console.log("err donor confirm: ", e);
  }
};
let updateRequestService = async (data) => {
  try {
    let requestUpdated = {};
    let checkRequestId = await db.Request.findOne({
      where: { id: data.id },
      raw: false,
    });
    if (checkRequestId) {
      checkRequestId.groupBlood = data.groupBlood;
      checkRequestId.unitRequire = data.unitRequire;
      checkRequestId.offerBenefit = data.offerBenefit;
      checkRequestId.status = data.status;
      await checkRequestId.save();
      let getRequestInforAgain = await db.Request.findOne({
        where: { id: data.id },
        raw: true,
      });
      requestUpdated.content = getRequestInforAgain;
      requestUpdated.statusCode = 200;
      requestUpdated.message = "Cập nhật thành công!";
    } else {
      requestUpdated.statusCode = 404;
      requestUpdated.message = "Không tìm thấy!";
    }
    return requestUpdated;
  } catch (e) {
    console.log("err update: ", e);
  }
};
let deleteRequestByIdService = async (data) => {
  try {
    let message = {};
    let request = await db.Request.findOne({
      where: { id: data.id },
    });
    if (!request) {
      message.statusCode = 404;
      message.message = "Không tìm thấy!!";
    } else {
      await db.Request.destroy({
        where: { id: data.id },
      });
      message.statusCode = 200;
      message.message = "Xóa thành công!";
    }
    return message;
  } catch (e) {
    console.log(e);
  }
};
let createRequestService = async (data) => {
  try {
    let requestCreated = {};
    if (!data.recipientId || !data.groupBlood) {
      requestCreated.statusCode = 422;
      requestCreated.message = "Thiếu thông số bắt buộc!";
    } else {
      const request = await db.Request.create({
        recipientId: data.recipientId,
        groupBlood: data.groupBlood,
        unitRequire: data.unitRequire,
        offerBenefit: data.offerBenefit,
        status: "S1",
      });
      const recipientInfo = await db.User.findOne({
        where: { id: data.recipientId },
      });
      const content = {
        request,
        recipientInfo,
      };
      requestCreated.statusCode = 201;
      requestCreated.message = "Tạo yêu cầu thành công!";
      requestCreated.content = content;
    }
    return requestCreated;
  } catch (e) {
    console.log(e);
  }
};
let createNotifyService = async (data) => {
  try {
    let notifyCreated = {};

    const notify = await db.Notify.create({
      recipientId: data.recipientId,
      recipientName: data.recipientName,
      donorId: data.donorId,
      donorName: data.donorName,
      donorDeleted: data.donorDeleted,
      recipientDeleted: data.recipientDeleted,
      type: data.type,
      unitRequire: data.unitRequire,
    });
    notifyCreated.statusCode = 201;
    notifyCreated.message = "Tạo thông báo thành công!";
    notifyCreated.content = notify;

    return notifyCreated;
  } catch (e) {
    console.log(e);
  }
};
let getNewestBookingService = async (data) => {
  try {
    let bookingSearch = {};
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM bookings where bookings.donorId = ${data.id} ORDER BY id DESC LIMIT 1`,
      { tupleFormat: "array" }
    );
    if (results.length === 0) {
      bookingSearch.statusCode = 404;
      bookingSearch.message = "Không tìm thấy lịch hẹn nào!";
    } else {
      bookingSearch.statusCode = 200;
      bookingSearch.message = "Tìm kiếm thành công!";
      bookingSearch.content = results;
    }
    return bookingSearch;
  } catch (e) {
    console.log(e);
  }
};
let getUserSearchService = async (keyWord) => {
  try {
    let userSearch = {};
    const [results, metadata] = await sequelize.query(
      `SELECT * FROM users WHERE email LIKE '%${keyWord}%' OR firstName LIKE '%${keyWord}%' OR lastName LIKE '%${keyWord}%' OR hospitalName LIKE '%${keyWord}%'`,
      { tupleFormat: "array" }
    );
    if (results.length === 0) {
      userSearch.statusCode = 404;
      userSearch.message = "Không tìm thấy người dùng nào!";
    } else {
      userSearch.statusCode = 200;
      userSearch.message = "Tìm kiếm thành công!";
      userSearch.content = results;
    }
    return userSearch;
  } catch (e) {
    console.log(e);
  }
};
let searchUserPaginationService = async (body) => {
  try {
    let userSearch = {};
    const { keyWord, pageNumber, numOfElement } = body;
    if (!pageNumber || !numOfElement) {
      userSearch.statusCode = 422;
      userSearch.message =
        "Không thể xác định số trang hay số phần tử trên trang";
    } else {
      const page = parseInt(pageNumber);
      const limit = parseInt(numOfElement);
      const [results, metadata] = await sequelize.query(
        `SELECT * FROM users WHERE email LIKE '%${keyWord}%' OR firstName LIKE '%${keyWord}%' OR lastName LIKE '%${keyWord}%' OR hospitalName LIKE '%${keyWord}%' LIMIT ${limit} OFFSET ${
          (page - 1) * limit
        }`,
        { tupleFormat: "array" }
      );
      if (results.length === 0) {
        userSearch.statusCode = 404;
        userSearch.message = "Không tìm thấy người dùng nào!";
      } else {
        userSearch.statusCode = 200;
        userSearch.message = "Tìm kiếm thành công!";
        userSearch.content = results;
      }
    }
    return userSearch;
  } catch (error) {
    console.log(error);
  }
};
let registerService = async (data) => {
  try {
    let userSignup = {};
    let checkUserEmail = await db.User.findOne({
      where: { email: data.email },
    });
    if (checkUserEmail) {
      userSignup.statusCode = 409;
      userSignup.message = "Email này đã tồn tại trong hệ thống!";
    } else {
      await db.User.create({
        email: data.email,
        password: authController.hashPassword(data.password),
        roleId: data.roleId,
        firstName: data.firstName,
        lastName: data.lastName,
        hospitalName: data.hospitalName,
        gender: data.gender,
        birthday: data.birthday,
        ward: data.ward,
        district: data.district,
        city: data.city,
        address: data.address,
        phoneNumber: data.phoneNumber,
        image: data.image,
        groupBlood: data.groupBlood,
      });
      userSignup.statusCode = 201;
      userSignup.message = "Tạo tài khoản thành công!";
    }
    return userSignup;
  } catch (e) {
    console.log(e);
  }
};
let loginService = async (email, password) => {
  try {
    let userData = {};
    let checkUserEmail = await db.User.findOne({
      where: { email },
    });
    if (!checkUserEmail) {
      userData.statusCode = 404;
      userData.message = "Email này không tồn tại trong hệ thống!";
      userData.content = {};
    } else {
      if (checkUserEmail.status === "inactive") {
        userData.statusCode = 403;
        userData.message = "Tài khoản của bạn đã bị khóa!";
      }
      if (checkUserEmail.status === "active") {
        let checkPassword = await authController.comparePassword(
          password,
          checkUserEmail.password
        );
        if (!checkPassword) {
          userData.statusCode = 404;
          userData.message = "Mật khẩu của bạn không khớp!";
          userData.content = {};
        } else {
          const infoToGenerateToken = {
            roleId: checkUserEmail.roleId,
            email: checkUserEmail.email,
          };
          const token = authController.generateToken(infoToGenerateToken);
          const data = {
            id: checkUserEmail.id,
            email: checkUserEmail.email,
            roleId: checkUserEmail.roleId,
            firstName: checkUserEmail.firstName,
            lastName: checkUserEmail.lastName,
            hospitalName: checkUserEmail.hospitalName,
            gender: checkUserEmail.gender,
            birthday: checkUserEmail.birthday,
            ward: checkUserEmail.ward,
            district: checkUserEmail.district,
            city: checkUserEmail.city,
            address: checkUserEmail.address,
            phoneNumber: checkUserEmail.phoneNumber,
            image: checkUserEmail.image,
            groupBlood: checkUserEmail.groupBlood,
            numberOfDonation: checkUserEmail.numberOfDonation,
            accessToken: token,
          };
          userData.statusCode = 200;
          userData.message = "Đăng nhập thành công!";
          userData.content = data;
        }
      }
    }
    return userData;
  } catch (e) {
    console.log(e);
  }
};
let getAllUsersService = async () => {
  try {
    let allUsers = await db.User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    return allUsers;
  } catch (e) {
    console.log(e);
  }
};
let getTopDonorService = async () => {
  try {
    let allUsers = await db.User.findAll({
      where: {
        roleId: "R3",
      },
      attributes: {
        exclude: ["password"],
      },
      order: [["numberOfDonation", "DESC"]],
    });
    return allUsers;
  } catch (e) {
    console.log(e);
  }
};
let getUserByIdService = async (userId) => {
  try {
    let userInfor = {};
    let user = await db.User.findOne({
      where: {
        id: userId,
      },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      userInfor.statusCode = 404;
      userInfor.message = "Không tìm thấy!";
      userInfor.content = {};
    } else {
      userInfor.statusCode = 200;
      userInfor.message = "Lấy thông tin người dùng thành công!";
      userInfor.content = user;
    }
    return userInfor;
  } catch (e) {
    console.log(e);
  }
};
let getUserByTypeService = async (userType) => {
  try {
    let userInfor = {};
    let users = await db.User.findAll({
      where: {
        roleId: userType,
      },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!users || users.length <= 0) {
      userInfor.statusCode = 404;
      userInfor.message = "Không tìm thấy!";
      userInfor.content = {};
    } else {
      userInfor.statusCode = 200;
      userInfor.message = "Lấy thông tin người dùng thành công!";
      userInfor.content = users;
    }
    return userInfor;
  } catch (e) {
    console.log(e);
  }
};
let getAllCodeService = async (typeInput) => {
  try {
    let allCode = {};
    let dataAllCode = await db.Allcode.findAll({
      where: {
        type: typeInput,
      },
    });
    if (!dataAllCode || dataAllCode.length <= 0) {
      allCode.statusCode = 404;
      allCode.message = "Vai trò không đúng!";
    } else {
      allCode.statusCode = 200;
      allCode.message = "Lấy dữ liệu thành công!";
      allCode.content = dataAllCode;
    }
    return allCode;
  } catch (e) {
    console.log(e);
  }
};
let deleteBookingByIdService = async (data) => {
  try {
    let message = {};
    let booking = await db.Booking.findOne({
      where: { id: data.id },
    });
    if (!booking) {
      message.statusCode = 404;
      message.message = "Không tìm thấy!!";
    } else {
      await db.Booking.destroy({
        where: { id: data.id },
      });
      message.statusCode = 200;
      message.message = "Xóa thành công!";
    }
    return message;
  } catch (e) {
    console.log(e);
  }
};
let getBookingByIdService = async (idBooking) => {
  try {
    let message = {};
    let booking = await db.Booking.findOne({
      where: { id: idBooking },
    });
    if (!booking) {
      message.statusCode = 404;
      message.message = "Không tìm thấy!!";
    } else {
      message.statusCode = 200;
      message.message = "Lấy thông tin booking thành công!";
      message.content = booking;
    }
    return message;
  } catch (e) {
    console.log(e);
  }
};
let deleteUserService = async (data) => {
  try {
    let message = {};
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (!user) {
      message.statusCode = 404;
      message.message = "Không tìm thấy!!";
    } else {
      await db.User.destroy({
        where: { id: data.id },
      });
      message.statusCode = 200;
      message.message = "Xóa thành công!";
    }
    return message;
  } catch (e) {
    console.log(e);
  }
};
let updateUserService = async (data) => {
  try {
    let userUpdated = {};
    let checkUserId = await db.User.findOne({
      where: { id: data.id },
      raw: false,
    });
    if (checkUserId) {
      checkUserId.roleId = data.roleId;
      checkUserId.firstName = data.firstName;
      checkUserId.lastName = data.lastName;
      checkUserId.hospitalName = data.hospitalName;
      checkUserId.gender = data.gender;
      checkUserId.birthday = data.birthday;
      checkUserId.ward = data.ward;
      checkUserId.district = data.district;
      checkUserId.city = data.city;
      checkUserId.address = data.address;
      checkUserId.phoneNumber = data.phoneNumber;
      checkUserId.groupBlood = data.groupBlood;
      checkUserId.numberOfDonation = data.numberOfDonation;
      checkUserId.status = data.status;
      if (data.image) {
        checkUserId.image = data.image;
      }
      await checkUserId.save();
      let getUserInforAgain = await db.User.findOne({
        where: { id: data.id },
        raw: true,
      });
      userUpdated.content = getUserInforAgain;
      userUpdated.statusCode = 200;
      userUpdated.message = "Cập nhật thành công!";
    } else {
      userUpdated.statusCode = 404;
      userUpdated.message = "Không tìm thấy!";
    }
    return userUpdated;
  } catch (e) {
    console.log("err update: ", e);
  }
};
let inActiveUserService = async (inputId) => {
  try {
    let userUpdated = {};
    let checkUserId = await db.User.findOne({
      where: { id: inputId },
      raw: false,
    });
    if (checkUserId) {
      checkUserId.status = "inactive";
      await checkUserId.save();
      let getUserInforAgain = await db.User.findOne({
        where: { id: inputId },
        raw: true,
      });
      userUpdated.content = getUserInforAgain;
      userUpdated.statusCode = 200;
      userUpdated.message = "Khóa tài khoản thành công!";
    } else {
      userUpdated.statusCode = 404;
      userUpdated.message = "Không tìm thấy!";
    }
    return userUpdated;
  } catch (e) {
    console.log("err update: ", e);
  }
};
let activeUserService = async (inputId) => {
  try {
    let userUpdated = {};
    let checkUserId = await db.User.findOne({
      where: { id: inputId },
      raw: false,
    });
    if (checkUserId) {
      checkUserId.status = "active";
      await checkUserId.save();
      let getUserInforAgain = await db.User.findOne({
        where: { id: inputId },
        raw: true,
      });
      userUpdated.content = getUserInforAgain;
      userUpdated.statusCode = 200;
      userUpdated.message = "Mở khóa thành công!";
    } else {
      userUpdated.statusCode = 404;
      userUpdated.message = "Không tìm thấy!";
    }
    return userUpdated;
  } catch (e) {
    console.log("err update: ", e);
  }
};
let getTotalDonationService = async () => {
  try {
    let num = await db.User.findAll({
      attributes: [
        [
          sequelize.fn("sum", sequelize.col("numberOfDonation")),
          "totalDonation",
        ],
      ],
    });
    return num;
  } catch (e) {
    console.log(e);
  }
};
let getTotalDonorService = async () => {
  try {
    let num = await db.User.findAll({
      where: {
        roleId: "R3",
      },
      attributes: [[sequelize.fn("count", sequelize.col("id")), "totalDonors"]],
    });
    return num;
  } catch (e) {
    console.log(e);
  }
};
let getTotalRecipientService = async () => {
  try {
    let num = await db.User.findAll({
      where: {
        roleId: "R4",
      },
      attributes: [
        [sequelize.fn("count", sequelize.col("id")), "totalRecipients"],
      ],
    });
    return num;
  } catch (e) {
    console.log(e);
  }
};
let buildUrlEmail = (hospitalId, token) => {
  let result = `${process.env.URL_REACT}/donor/verify-booking?token=${token}&hospitalId=${hospitalId}`;
  return result;
};
let postBookingScheduleService = async (data) => {
  try {
    let booking = {};
    if (
      !data.email ||
      !data.hospitalId ||
      !data.timeType ||
      !data.date ||
      !data.fullName ||
      !data.donorId
    ) {
      booking.statusCode = 422;
      booking.message = "Thiếu thông số bắt buộc!";
    } else {
      let token = uuidv4();
      await emailService.sendSimpleEmail({
        receiverEmail: data.email,
        donorName: data.fullName,
        time: data.timeString,
        hospitalName: data.hospitalName,
        // language: data.language,
        redirectLink: buildUrlEmail(data.hospitalId, token),
      });
      await db.Booking.findOrCreate({
        where: {
          date: data.date,
          timeType: data.timeType,
        },
        defaults: {
          status: "S1",
          hospitalId: data.hospitalId,
          donorId: data.donorId,
          date: data.date,
          timeType: data.timeType,
          token: token,
        },
      });
      booking.statusCode = 201;
      booking.message = "Thành công!";
    }
    return booking;
  } catch (e) {
    console.log(e);
  }
};
let postVerifyBookingSchedule = async (data) => {
  try {
    let booking = {};
    if (!data.token || !data.hospitalId) {
      booking.statusCode = 422;
      booking.message = "Thiếu thông số bắt buộc!";
    } else {
      let appointment = await db.Booking.findOne({
        where: {
          hospitalId: data.hospitalId,
          token: data.token,
          status: "S1",
        },
        raw: false,
      });
      if (appointment) {
        appointment.status = "S2";
        await appointment.save();
        booking.statusCode = 200;
        booking.message = "Cập nhật trạng thái lịch hẹn thành công!";
      } else {
        booking.statusCode = 404;
        booking.message = "Lịch hẹn đã được xác nhận hoặc không tồn tại!";
      }
    }
    return booking;
  } catch (e) {
    console.log(e);
  }
};
let buildUrlResetPassword = (email,token) => {
  let result = `${process.env.URL_REACT}/reset-password?token=${token}&email=${email}`;
  return result;
};
let postResetPasswordService = async (emailReset) => {
  try {
    let dataReset = {};
    let checkUserEmail = await db.User.findOne({
      where: { email: emailReset },
    });
    if (!checkUserEmail) {
      dataReset.statusCode = 404;
      dataReset.message = "Email này không tồn tại trong hệ thống!";
    } else {
      let token = uuidv4();
      await emailService.sendEmailResetPassword({
        receiverEmail: emailReset,
        redirectLink: buildUrlResetPassword(emailReset,token),
      });
      const user = await db.User.findOne({
        where: {
          email: emailReset
        },
      });
      user.tokenPassword = token;
      user.save();
      dataReset.statusCode = 200;
      dataReset.message = "Email đã được gửi thành công!";
    }
    return dataReset;
  } catch (e) {
    console.log(e);
  }
};
let postVerifyResetPassword = async (data) => {
  try {
    let dataReset = {};
    if (!data.email || !data.password) {
      dataReset.statusCode = 422;
      dataReset.message = "Thiếu thông số bắt buộc!";
    } else {
      let checkUserEmail = await db.User.findOne({
        where: { 
          email: data.email ,
          tokenPassword: data.token
        },
        raw: false,
      });
      if (checkUserEmail) {
        checkUserEmail.password = authController.hashPassword(data.password);
        await checkUserEmail.save();
        dataReset.statusCode = 200;
        dataReset.message = "Đặt lại mật khẩu thành công!";
      } else {
        dataReset.statusCode = 404;
        dataReset.message =
          "Đặt lại mật khẩu thất bại vì không tìm thấy email!";
      }
    }
    return dataReset;
  } catch (e) {
    console.log("Lỗi service", e);
  }
};
module.exports = {
  loginService,
  getAllUsersService,
  getTopDonorService,
  getUserByIdService,
  registerService,
  getAllCodeService,
  deleteUserService,
  updateUserService,
  getTotalDonationService,
  getTotalDonorService,
  getTotalRecipientService,
  postBookingScheduleService,
  postVerifyBookingSchedule,
  getUserByTypeService,
  inActiveUserService,
  activeUserService,
  postResetPasswordService,
  postVerifyResetPassword,
  getUserSearchService,
  searchUserPaginationService,
  getNewestBookingService,
  deleteBookingByIdService,
  createRequestService,
  deleteRequestByIdService,
  updateRequestService,
  donorConfirmRequestService,
  recipientConfirmRequestSuccessService,
  recipientConfirmRequestFailedService,
  getAllRequestByGroupBloodService,
  getAllRequestByRecipientIdService,
  createNotifyService,
  getNotifyForRecipientService,
  getNotifyForDonorService,
  getBookingByIdService,
};
