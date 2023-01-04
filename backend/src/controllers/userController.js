import db from "../models";
import userService from "../services/userService";
let handleDeleteNotifyByRecipient = async (req, res) => {
  try {
    let id = req.body.id;
    let notifyDelete = {}
    let checkNotifyId = await db.Notify.findOne({
      where: { id},
      raw: false,
    });
    if (checkNotifyId) {
      checkNotifyId.recipientDeleted = "1";
      await checkNotifyId.save();
      notifyDelete.statusCode = 200;
      notifyDelete.message = "Xóa mềm thông báo thành công!";
    } else {
      notifyDelete.statusCode = 404;
      notifyDelete.message = "Không tìm thấy!";
    }
    res.status(notifyDelete.statusCode).json({
      statusCode: notifyDelete.statusCode,
      message: notifyDelete.message,
    });
  } catch (e) {
    console.log("err update: ", e);
  }
}
let handleDeleteNotifyByDonor = async (req, res) => {
  try {
    let id = req.body.id;
    let notifyDelete = {}
    let checkNotifyId = await db.Notify.findOne({
      where: { id},
      raw: false,
    });
    if (checkNotifyId) {
      checkNotifyId.donorDeleted = "1";
      await checkNotifyId.save();
      notifyDelete.statusCode = 200;
      notifyDelete.message = "Xóa mềm thông báo thành công!";
    } else {
      notifyDelete.statusCode = 404;
      notifyDelete.message = "Không tìm thấy!";
    }
    res.status(notifyDelete.statusCode).json({
      statusCode: notifyDelete.statusCode,
      message: notifyDelete.message,
    });
  } catch (e) {
    console.log("err update: ", e);
  }
}
let handleGetNotifyForRecipient = async (req, res) => {
  try {
    let recipientId = req.query.recipientId;
    if (!recipientId) {
      res.send({
        statusCode: 422,
        message: "Thiếu recipientId!",
      });
    } else {
      let notifies = await userService.getNotifyForRecipientService(recipientId);
      res.status(notifies.statusCode).json({
        statusCode: notifies.statusCode,
        message: notifies.message,
        content: notifies.content,
      });
    }
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
}
let handleGetNotifyForDonor = async (req, res) => {
  try {
    let donorId = req.query.donorId;
    if (!donorId) {
      res.send({
        statusCode: 422,
        message: "Thiếu donorId!",
      });
    } else {
      let notifies = await userService.getNotifyForDonorService(donorId);
      res.status(notifies.statusCode).json({
        statusCode: notifies.statusCode,
        message: notifies.message,
        content: notifies.content,
      });
    }
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
}
let handleGetAllRequestByRecipientId = async (req, res) =>{
  try {
    let id = req.query.id;
    if (!id) {
      res.send({
        statusCode: 422,
        message: "Thiếu id!",
      });
    } else {
      let requests = await userService.getAllRequestByRecipientIdService(id);
      res.status(requests.statusCode).json({
        statusCode: requests.statusCode,
        message: requests.message,
        content: requests.content,
      });
    }
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
}
let handleGetAllRequestByGroupBlood = async (req,res) => {
  try {
    let groupBlood = req.query.groupBlood;
    if (!groupBlood) {
      res.send({
        statusCode: 422,
        message: "Thiếu groupBlood!",
      });
    } else {
      let requests = await userService.getAllRequestByGroupBloodService(groupBlood);
      res.status(requests.statusCode).json({
        statusCode: requests.statusCode,
        message: requests.message,
        content: requests.content,
      });
    }
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
}
let handleRecipientConfirmRequestSuccess = async (req, res) => {
  try {
    if (!req.body.id) {
      res.send({
        statusCode: 422,
        message: "Thiếu request Id!",
      });
    } else {
      let requestUpdated = await userService.recipientConfirmRequestSuccessService(req.body);
      res.status(200).json(requestUpdated);
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
}
let handleRecipientConfirmRequestFailed = async (req, res) => {
  try {
    if (!req.body.id) {
      res.send({
        statusCode: 422,
        message: "Thiếu request Id!",
      });
    } else {
      let requestUpdated = await userService.recipientConfirmRequestFailedService(req.body);
      res.status(200).json(requestUpdated);
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
}
let handleDonorConfirmRequest = async (req, res) => {
  try {
    if (!req.body.id) {
      res.send({
        statusCode: 422,
        message: "Thiếu request Id!",
      });
    } else {
      let requestUpdated = await userService.donorConfirmRequestService(req.body);
      res.status(200).json(requestUpdated);
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
}
let handleUpdateRequest = async (req, res) => {
  try {
    if (!req.body.id) {
      res.send({
        statusCode: 422,
        message: "Thiếu request Id!",
      });
    } else {
      let requestUpdated = await userService.updateRequestService(req.body);
      res.status(200).json(requestUpdated);
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
}
let handleDeleteRequest = async (req, res) =>{
  try{  
    if (!req.body) {
      res.send({
        statusCode: 422,
        message: "Thiếu thông tin cần thiết!",
      });
    } else {
      let request = await userService.deleteRequestByIdService(req.body);
      res.status(request.statusCode).json(request);
    }
  }catch(e){
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
}
let handleCreateRequest = async (req, res) => {
  try {
    if (! req.body) {
      res.send({
        statusCode: 422,
        message: "Thiếu thông tin cần thiết!",
      });
    } else {
      let createRequest = await userService.createRequestService(req.body);
      res.status(createRequest.statusCode).json({
        statusCode: createRequest.statusCode,
        message: createRequest.message,
        content: createRequest.content
      });
    }
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleCreateNotify = async (req, res) => {
  try {
    if (! req.body) {
      res.send({
        statusCode: 422,
        message: "Thiếu thông tin cần thiết!",
      });
    } else {
      let createNotify = await userService.createNotifyService(req.body);
      res.status(createNotify.statusCode).json({
        statusCode: createNotify.statusCode,
        message: createNotify.message,
        content: createNotify.content
      });
    }
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleDeleteBookingById = async (req, res) => {
  try{  
    if (!req.body) {
      res.send({
        statusCode: 422,
        message: "Thiếu thông tin cần thiết!",
      });
    } else {
      let booking = await userService.deleteBookingByIdService(req.body);
      res.status(booking.statusCode).json(booking);
    }
  }catch(e){
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
}

let handleGetBookingById = async (req, res) => {
  try{  
    let id = req.query.id;
    console.log(id)
    if (!id) {
      res.send({
        statusCode: 422,
        message: "Thiếu thông tin cần thiết!",
      });
    } else {
      let booking = await userService.getBookingByIdService(id);
      res.status(booking.statusCode).json(booking);
    }
  }catch(e){
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
}

let handleGetNewestBooking = async (req, res) => {
  try{  
    if (!req.body) {
      res.send({
        statusCode: 422,
        message: "Thiếu thông tin cần thiết!",
      });
    } else {
      let booking = await userService.getNewestBookingService(req.body);
      res.status(booking.statusCode).json(booking);
    }
  }catch(e){
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
}
let handleSearchUser = async (req, res) => {
  try {
    let keyWord = await req.query.keyWord;
    let content = await userService.getUserSearchService(keyWord);
    res.status(content.statusCode).json({
      statusCode: content.statusCode,
      message: content.message,
      content: content.content,
    });

  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
}
let handleSearchUserPagination = async (req, res) => {
  try {
    if (!req.body) {
      res.send({
        statusCode: 422,
        message: "Thiếu thông tin cần thiết!",
      });
    } else {
      let user = await userService.searchUserPaginationService(req.body);
      res.status(user.statusCode).json(user);
    }
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
}
let handleRegister = async (req, res) => {
  try {
    const { email, password, roleId } = req.body;
    if (!email || !password || !roleId) {
      res.send({
        statusCode: 422,
        message: "Missing require parameters!",
      });
    } else {
      let userSignup = await userService.registerService(req.body);
      res.status(userSignup.statusCode).json({
        statusCode: userSignup.statusCode,
        message: userSignup.message,
      });
    }
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email) {
      res.send({
        statusCode: 422,
        message: "Missing email address!",
      });
    } else {
      if (!password) {
        res.send({
          statusCode: 422,
          message: "Missing password!",
        });
      } else {
        let userData = await userService.loginService(email, password);
        res.status(userData.statusCode).json({
          statusCode: userData.statusCode,
          message: userData.message,
          content: userData.content,
        });
      }
    }
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleResetPassword = async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) {
      res.send({
        statusCode: 422,
        message: "Thiếu email!",
      });
    } else {
      let userData = await userService.postResetPasswordService(email);
      res.status(userData.statusCode).json({
        statusCode: userData.statusCode,
        message: userData.message,
        content: userData.content,
      });
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handlePostVerifyResetPassword = async (req, res) => {
  try {
    let infor = await userService.postVerifyResetPassword(req.body);
    return res.status(infor.statusCode).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      statusCode: 500,
      message: "Lỗi từ Server",
    });
  }
};
let handleGetAllCode = async (req, res) => {
  try {
    let typeInput = await req.query.type;
    if (!typeInput) {
      res.send({
        statusCode: 422,
        message: "Thiếu thông tin đầu vào!",
      });
    } else {
      let content = await userService.getAllCodeService(typeInput);
      res.status(content.statusCode).json({
        statusCode: content.statusCode,
        message: content.message,
        content: content.content,
      });
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetAllUsers = async (req, res) => {
  try {
    let users = await userService.getAllUsersService();
    res.status(200).json({
      statusCode: 200,
      message: "Lấy danh sách người dùng thành công!",
      content: users,
    });
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetUserById = async (req, res) => {
  try {
    let id = req.query.id;
    if (!id) {
      res.send({
        statusCode: 422,
        message: "Bạn chưa nhập id!",
      });
    } else {
      let user = await userService.getUserByIdService(id);
      res.status(user.statusCode).json({
        statusCode: user.statusCode,
        message: user.message,
        content: user.content,
      });
    }
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetUserByType = async (req, res) => {
  try {
    let type = req.query.type;
    if (!type) {
      res.send({
        statusCode: 422,
        message: "Missing user type!",
      });
    } else {
      let user = await userService.getUserByTypeService(type);
      res.status(user.statusCode).json({
        statusCode: user.statusCode,
        message: user.message,
        content: user.content,
      });
    }
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetTopDonor = async (req, res) => {
  try {
    let users = await userService.getTopDonorService();
    res.status(200).json({
      statusCode: 200,
      message: "Lấy danh sách top người hiến máu thành công!",
      content: users,
    });
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
}
let handleDeteleUser = async (req, res) => {
  try {
    if (!req.body) {
      res.send({
        statusCode: 422,
        message: "Missing user id!",
      });
    } else {
      let message = await userService.deleteUserService(req.body);
      res.status(message.statusCode).json(message);
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleUpdateUser = async (req, res) => {
  try {
    if (!req.body.id) {
      res.send({
        statusCode: 422,
        message: "Missing input user id!",
      });
    } else {
      let userUpdated = await userService.updateUserService(req.body);
      res.status(200).json(userUpdated);
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetTotalDonation = async (req, res) => {
  try {
    let num = await userService.getTotalDonationService();
    res.status(200).json({
      statusCode: 200,
      message: "Successfully!",
      content: num,
    });
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetTotalDonor = async (req, res) => {
  try {
    let num = await userService.getTotalDonorService();
    res.status(200).json({
      statusCode: 200,
      message: "Successfully!",
      content: num,
    });
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetTotalRecipient = async (req, res) => {
  try {
    let num = await userService.getTotalRecipientService();
    res.status(200).json({
      statusCode: 200,
      message: "Successfully!",
      content: num,
    });
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handlePostBookingSchedule = async (req, res) => {
  try {
    let infor = await userService.postBookingScheduleService(req.body);
    return res.status(infor.statusCode).json(infor);
  } catch (e) {
    return res.status(500).json({
      statusCode: 500,
      message: "Lỗi từ Server",
    });
  }
};
let handlePostVerifyBookingSchedule = async (req, res) => {
  try {
    let infor = await userService.postVerifyBookingSchedule(req.body);
    return res.status(infor.statusCode).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      statusCode: 500,
      message: "Lỗi từ Server",
    });
  }
};
let handleActiveUser = async (req, res) => {
  try {
    if (!req.body.id) {
      res.send({
        statusCode: 422,
        message: "Missing input user id!",
      });
    } else {
      let userUpdated = await userService.activeUserService(req.body.id);
      res.status(userUpdated.statusCode).json(userUpdated);
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleInActiveUser = async (req, res) => {
  try {
    if (!req.body.id) {
      res.send({
        statusCode: 422,
        message: "Missing input user id!",
      });
    } else {
      let userUpdated = await userService.inActiveUserService(req.body.id);
      res.status(userUpdated.statusCode).json(userUpdated);
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
module.exports = {
  handleRegister,
  handleLogin,
  handleGetAllUsers,
  handleGetUserById,
  handleGetUserByType,
  handleGetAllCode,
  handleDeteleUser,
  handleUpdateUser,
  handleGetTotalDonation,
  handleGetTotalDonor,
  handleGetTotalRecipient,
  handlePostBookingSchedule,
  handlePostVerifyBookingSchedule,
  handleActiveUser,
  handleInActiveUser,
  handleResetPassword,
  handlePostVerifyResetPassword,
  handleGetTopDonor,
  handleSearchUser,
  handleSearchUserPagination,
  handleGetNewestBooking,
  handleDeleteBookingById,
  handleCreateRequest,
  handleUpdateRequest,
  handleDeleteRequest,
  handleDonorConfirmRequest,
  handleRecipientConfirmRequestSuccess,
  handleRecipientConfirmRequestFailed,
  handleGetAllRequestByGroupBlood,
  handleGetAllRequestByRecipientId,
  handleCreateNotify,
  handleGetNotifyForRecipient,
  handleGetNotifyForDonor,
  handleDeleteNotifyByRecipient,
  handleDeleteNotifyByDonor,
  handleGetBookingById
};
