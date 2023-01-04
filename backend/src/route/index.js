import express, { Router } from "express";
let router = express.Router();
import userController from "../controllers/userController";
import hospitalController from "../controllers/hospitalController";
import authController from "../controllers/authController";

let initWebRoutes = (app) => {
  //Home page
  router.get("/api/get-total-donation", userController.handleGetTotalDonation);
  router.get("/api/get-total-donor", userController.handleGetTotalDonor);
  router.get(
    "/api/get-total-recipient",
    userController.handleGetTotalRecipient
  );
  router.get("/api/get-top-donor", userController.handleGetTopDonor);

  //User
  router.post("/api/register", userController.handleRegister);
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.get("/api/get-user-by-id", userController.handleGetUserById); //admin
  router.get("/api/get-user-by-type", userController.handleGetUserByType); //admin
  router.get("/api/search-user", userController.handleSearchUser); //admin
  router.get("/api/search-user-pagination", userController.handleSearchUserPagination); //admin
  router.post("/api/create-new-user", userController.handleRegister); //admin
  router.get("/api/allcode", userController.handleGetAllCode);
  router.delete("/api/delete-user", userController.handleDeteleUser); //admin
  router.put("/api/update-user", userController.handleUpdateUser); //admin
  router.put("/api/update-profile", userController.handleUpdateUser);
  router.put("/api/active-user", userController.handleActiveUser); //admin
  router.put("/api/inactive-user", userController.handleInActiveUser); //admin
  // Quên mật khẩu: 
  // B1: click vào nút quên mật khẩu để hiện lên form điền vào email 
  // B2: điền email vào ô input rồi bấm nút gửi
  // Tại B2 khi người dùng bấm nút gửi thì gọi api sau để gửi email về hệ thống: (gửi qua body)
  router.post("/api/reset-password", userController.handleResetPassword)
  // B3: hiện lên gif loading cho đến khi email đc gửi xong
  // B4: toastify : Lấy từ mesage trong api gửi về  !
  // B5: Khi người dùng click vào link trong email thì sẽ chuyển đến trang để nhập lại password + confirmPassword
  // Trang nhập lại:localhost:3000/reset-password?email=${email}`;
  // B6: Sau khi nhập pass + confirmPass vào thì ấn nút gửi để gọi api sau: để gửi lên email, password
  router.post(
    "/api/verify-reset-password",
    userController.handlePostVerifyResetPassword
  );
  router.post(
    "/api/increase-current-number",
    hospitalController.handleIncreaseCurrentNumber
  )
  // B7: Dựa vào message từ api để hiển thị ra giao diện rồi set Time out khoảng 3 giây để redirect lại trang đăng nhập

  //Event
  router.get("/api/get-all-events", hospitalController.handleGetAllEvents);
  router.get(
    "/api/get-event-hospital-by-date",
    hospitalController.handleGetEventByDate
  );
  router.get(
    "/api/get-event-by-hospital-id",
    hospitalController.handleGetEventByHospitalId
  );
  router.post("/api/create-event", hospitalController.handleCreateEvent); //hospital, admin
  router.put("/api/update-event", hospitalController.handleUpdateEvent); //admin,hospital
  router.delete("/api/delete-event", hospitalController.handleDeteleEvent); //admin,hospital

  //Schedule
  router.get(
    "/api/get-all-schedules",
    hospitalController.handleGetAllSchedules
  );
  router.get(
    "/api/get-schedule-hospital-by-date",
    hospitalController.handleGetScheduleByDate
  );
  router.get(
    "/api/get-schedule-hospital-by-id",
    hospitalController.handleGetScheduleById
  );
  router.post(
    "/api/create-schedule",
    hospitalController.handleBulkCreateSchedule
  );
  router.put("/api/update-schedule", hospitalController.handleUpdateSchedule); //admin,hospital
  router.delete(
    "/api/delete-schedule",
    hospitalController.handleDeteleSchedule
  ); 
  router.post(
    "/api/donor-booking-schedule",
    userController.handlePostBookingSchedule
  );
  router.post(
    "/api/verify-book-appointment",
    userController.handlePostVerifyBookingSchedule
  );
  router.post('/api/get-newest-booking-of-user', userController.handleGetNewestBooking)
  // booking
  router.delete('/api/delete-booking-by-id', userController.handleDeleteBookingById)
  router.post('/api/hospital-confirm-booking', hospitalController.handleConfirmBookingByHospital)
  router.get('/api/get-all-booking-by-donor-id',hospitalController.handleGetBookingsByDonorId)
  router.get('/api/get-all-booking-by-hospital-id', hospitalController.getAllBookingByHospitalId) 
  router.get('/api/get-booking-by-id', userController.handleGetBookingById) 

  // request
  router.post('/api/create-request', userController.handleCreateRequest)
  router.put('/api/update-request', userController.handleUpdateRequest)
  router.delete('/api/delete-request', userController.handleDeleteRequest)
  router.put('/api/donor-confirm-request', userController.handleDonorConfirmRequest)
  router.put('/api/recipient-confirm-request-success', userController.handleRecipientConfirmRequestSuccess)
  router.put('/api/recipient-confirm-request-failed', userController.handleRecipientConfirmRequestFailed)
  router.get('/api/get-all-request-by-group-blood', userController.handleGetAllRequestByGroupBlood)
  router.get('/api/get-all-request-by-recipient-id', userController.handleGetAllRequestByRecipientId)

  // notify
  router.post('/api/create-notify', userController.handleCreateNotify)
  router.get('/api/get-notify-by-recipient-id', userController.handleGetNotifyForRecipient)
  router.get('/api/get-notify-by-donor-id', userController.handleGetNotifyForDonor)
  router.put('/api/delete-notify-by-recipient', userController.handleDeleteNotifyByRecipient)
  router.put('/api/delete-notify-by-donor', userController.handleDeleteNotifyByDonor)
  //Home
  return app.use("/", router);
};

module.exports = initWebRoutes;
