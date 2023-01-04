import db, { sequelize } from "../models/index";
import _ from "lodash";
require("dotenv").config();
const getAllBookingByHospitalIdService = async (hospitalId, date) => {
  try {
    let bookingData = {};
    if (!hospitalId || !date) {
      bookingData.statusCode = 422;
      bookingData.message = "Thiếu thông số bắt buộc!";
    } else {
      let data = await db.Booking.findAll({
        where: {
          hospitalId: hospitalId,
          date: date,
        },
        include: [
          {
            model: db.User,
            as: "donorData",
            attributes: [
              "email",
              "firstName",
              "lastName",
              "phoneNumber",
              "gender",
              "address",
              "ward",
              "district",
              "city",
              "groupBlood",
            ],
          },
          {
            model: db.Allcode,
            as: "timeTypeDataDonor",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: false,
        nest: true,
      });
      if (!data || data.length === 0) {
        bookingData.statusCode = 404;
        bookingData.message = "Không tìm thấy thông tin!";
        data = [];
      } else {
        bookingData.statusCode = 200;
        bookingData.message = "Lấy dữ liệu thành công!";
        bookingData.content = data;
      }
      return bookingData;
    }
  } catch (e) {
    console.log(e);
  }
};
const getBookingsByDonorIdService = async (inputId) => {
  try {
    let bookingData = {};
    if (!inputId) {
      bookingData.statusCode = 422;
      bookingData.message = "Thiếu thông số bắt buộc!";
    } else {
      let data = await db.Booking.findAll({
        where: {
          donorId: inputId.donorId,
        },
      });
      if (!data || data.length === 0) {
        bookingData.statusCode = 404;
        bookingData.message = "Không tìm thấy thông tin!";
        data = [];
      } else {
        bookingData.statusCode = 200;
        bookingData.message = "Lấy dữ liệu thành công!";
        bookingData.content = data;
      }
      return bookingData;
    }
  } catch (e) {
    console.log(e);
  }
};
const confirmBookingByHospitalService = async (data) => {
  try {
    let bookingConfirmed = {};
    let checkBookingId = await db.Booking.findOne({
      where: { id: data.id },
      raw: false,
    });
    if (checkBookingId) {
      checkBookingId.status = "S3";
      checkBookingId.formalityDonate = data.formalityDonate
      checkBookingId.bloodAmount = data.bloodAmount
      await checkBookingId.save();
      let getBookingInforAgain = await db.Booking.findOne({
        where: { id: data.id },
        raw: true,
      });

      await db.User.update(
        { numberOfDonation: sequelize.literal("numberOfDonation + 1") },
        {
          where: {
            id: checkBookingId.donorId,
          },
        }
      );

      bookingConfirmed.content = getBookingInforAgain;
      bookingConfirmed.statusCode = 200;
      bookingConfirmed.message = "Cập nhật thành công!";
    } else {
      bookingConfirmed.statusCode = 404;
      bookingConfirmed.message = "Không tìm thấy!";
    }
    return bookingConfirmed;
  } catch (e) {
    console.log("err update: ", e);
  }
};
const increaseCurrentNumberService = async (data) => {
  try {
    let object = {};
    if (!data.token) {
      object.statusCode = 422;
      object.message = "Thiếu token";
    } else {
      let booking = await db.Booking.findOne({
        where: { token: data.token },
      });
      let schedule = await db.Schedule.findOne({
        where: {
          date: booking.date,
          timeType: booking.timeType,
        },
      });
      if (schedule.currentNumber < schedule.maxNumber) {
        // update current number
        await db.Schedule.update(
          { currentNumber: sequelize.literal("currentNumber + 1") },
          {
            where: {
              date: booking.date,
              timeType: booking.timeType,
            },
          }
        );
        object.statusCode = 200;
        object.message = "Cập nhật thành công";
      } else {
        object.statusCode = 400;
        object.message = "Số người hiến máu đã đạt giới hạn";
      }
    }
    return object;
  } catch (e) {
    console.log(e);
  }
};
let bulkCreateScheduleService = async (data) => {
  try {
    let scheduleCreate = {};
    if (!data.arrSchedule || !data.hospitalId || !data.formatedDate) {
      scheduleCreate.statusCode = 422;
      scheduleCreate.message = "Không có dữ liệu đặt lịch!";
    } else {
      let schedule = data.arrSchedule;

      // check existing in database
      let existing = await db.Schedule.findAll({
        where: { hospitalId: data.hospitalId, date: data.formatedDate },
        attributes: ["timeType", "date", "hospitalId", "maxNumber"],
        raw: true,
      });

      // convert date
      // if (existing && existing.length > 0) {
      //   existing = existing.map((item) => {
      //     item.date = new Date(item.date).getTime();
      //     return item;
      //   });
      // }

      // compare different schedules: (+) to convert to int
      let toCreate = _.differenceWith(schedule, existing, (a, b) => {
        return a.timeType === b.timeType && +a.date === +b.date;
      });
      // create data
      if (toCreate && toCreate.length > 0) {
        let dataCreate = await db.Schedule.bulkCreate(toCreate);
        if (dataCreate) {
          scheduleCreate.statusCode = 201;
          scheduleCreate.message = "Lịch hẹn đã được tạo thành công!";
        }
      } else {
        scheduleCreate.statusCode = 409;
        scheduleCreate.message =
          "Lịch hẹn này đã được tạo, hãy chọn mốc thời gian khác!";
      }
      return scheduleCreate;
    }
  } catch (e) {
    console.log(e);
  }
};
let getScheduleByDateService = async (hospitalId, date) => {
  try {
    let scheduleData = {};
    if (!hospitalId || !date) {
      scheduleData.statusCode = 422;
      scheduleData.message = "Thiếu thông số bắt buộc!";
    } else {
      let data = await db.Schedule.findAll({
        where: {
          hospitalId,
          date,
        },
        include: [
          {
            model: db.Allcode,
            as: "timeTypeData",
            attributes: ["valueVi", "valueEn"],
          },
          {
            model: db.User,
            as: "hospitalData",
            // attributes: ["firstName", "lastName"],
            attributes: ["hospitalName"],
          },
        ],
        raw: false,
        nest: true,
      });
      if (!data || data.length === 0) {
        scheduleData.statusCode = 404;
        scheduleData.message = "Không có lịch hẹn!";
        data = [];
      } else {
        scheduleData.statusCode = 200;
        scheduleData.message = "Lấy dữ liệu lịch hẹn thành công!";
        scheduleData.content = data;
      }
      return scheduleData;
    }
  } catch (e) {
    console.log(e);
  }
};
let getScheduleByIdService = async (inputId) => {
  try {
    let scheduleData = {};
    if (!inputId) {
      scheduleData.statusCode = 422;
      scheduleData.message = "Thiếu thông số bắt buộc!";
    } else {
      let data = await db.Schedule.findAll({
        where: {
          hospitalId: inputId,
        },
        order: [
          ["date", "asc"],
          ["timeType", "asc"],
        ],
        include: [
          {
            model: db.Allcode,
            as: "timeTypeData",
            attributes: ["valueVi", "valueEn"],
          },
          {
            model: db.User,
            as: "hospitalData",
            // attributes: ["firstName", "lastName"],
            attributes: ["hospitalName"],
          },
        ],
        raw: false,
        nest: true,
      });
      if (!data || data.length === 0) {
        scheduleData.statusCode = 404;
        scheduleData.message = "Không tìm thấy!";
        data = [];
      } else {
        scheduleData.statusCode = 200;
        scheduleData.message = "Lấy dữ liệu lịch hẹn thành công!";
        scheduleData.content = data;
      }
      return scheduleData;
    }
  } catch (e) {
    console.log(e);
  }
};
let createEventService = async (data) => {
  try {
    let eventCreate = {};
    if (!data.hospitalId) {
      eventCreate.statusCode = 422;
      eventCreate.message = "Thiếu thông số bắt buộc!";
    } else {
      await db.Event.create(data);
      eventCreate.statusCode = 201;
      eventCreate.message = "Tạo sự kiện thành công!";
    }
    return eventCreate;
  } catch (e) {
    console.log(e);
  }
};
let getEventByDateService = async (date) => {
  try {
    let eventData = {};
    if (!date) {
      eventData.statusCode = 422;
      eventData.message = "Thiếu thông số bắt buộc!";
    } else {
      let data = await db.Event.findAll({
        where: {
          date,
        },
        include: [
          {
            model: db.User,
            as: "hospitalData",
            // attributes: ["firstName", "lastName"],
            attributes: ["hospitalName"],
          },
        ],
        raw: false,
        nest: true,
      });
      if (!data || data.length === 0) {
        eventData.statusCode = 404;
        eventData.message = "Không tìm thấy!";
        data = [];
      } else {
        eventData.statusCode = 200;
        eventData.message = "Lấy thông tin sự kiện thành công!";
        eventData.content = data;
      }
      return eventData;
    }
  } catch (e) {
    console.log(e);
  }
};
let getEventByHospitalIdService = async (query) => {
  try {
    let eventData = {};
    if (!query.id) {
      eventData.statusCode = 422;
      eventData.message = "Thiếu thông số bắt buộc!";
    } else {
      let data = await db.Event.findAll({
        where: {
          hospitalId: query.id,
        },
        include: [
          {
            model: db.User,
            as: "hospitalData",
            // attributes: ["firstName", "lastName"],
            attributes: ["hospitalName"],
          },
        ],
        raw: false,
        nest: true,
      });
      if (!data || data.length === 0) {
        eventData.statusCode = 404;
        eventData.message = "Không tìm thấy!";
        data = [];
      } else {
        eventData.statusCode = 200;
        eventData.message = "Lấy thông tin sự kiện thành công!";
        eventData.content = data;
      }
      return eventData;
    }
  } catch (e) {
    console.log(e);
  }
};
let deleteEventService = async (inputId) => {
  try {
    let message = {};
    let event = await db.Event.findOne({
      where: { id: inputId },
    });
    if (!event) {
      message.statusCode = 404;
      message.message = "Không tìm thấy!";
    } else {
      await db.Event.destroy({
        where: { id: inputId },
      });
      message.statusCode = 200;
      message.message = "Xóa sự kiện thành công!";
    }
    return message;
  } catch (e) {
    console.log(e);
  }
};
let updateEventService = async (data) => {
  try {
    let eventUpdated = {};
    let checkEventId = await db.Event.findOne({
      where: { id: data.id },
      raw: false,
    });
    if (checkEventId) {
      checkEventId.hospitalId = data.hospitalId;
      checkEventId.location = data.location;
      checkEventId.date = data.date;
      checkEventId.description = data.description;
      checkEventId.nameEvent = data.nameEvent;
      await checkEventId.save();
      let getEventInforAgain = await db.Event.findOne({
        where: { id: data.id },
        raw: true,
      });
      eventUpdated.content = getEventInforAgain;
      eventUpdated.statusCode = 200;
      eventUpdated.message = "Cập nhật thành công!";
    } else {
      eventUpdated.statusCode = 404;
      eventUpdated.message = "Không tìm thấy!";
    }
    return eventUpdated;
  } catch (e) {
    console.log("err update: ", e);
  }
};
let getAllEventsService = async () => {
  try {
    let allEvents = await db.Event.findAll();
    return allEvents;
  } catch (e) {
    console.log(e);
  }
};
let getAllSchedulesService = async () => {
  try {
    let allSchedules = await db.Schedule.findAll();
    return allSchedules;
  } catch (e) {
    console.log(e);
  }
};
let deleteScheduleService = async (inputId) => {
  try {
    let message = {};
    let schedule = await db.Schedule.findOne({
      where: { id: inputId },
    });
    if (!schedule) {
      message.statusCode = 404;
      message.message = "Không tìm thấy!";
    } else {
      await db.Schedule.destroy({
        where: { id: inputId },
      });
      message.statusCode = 200;
      message.message = "Xóa lịch hẹn thành công!";
    }
    return message;
  } catch (e) {
    console.log(e);
  }
};
let updateScheduleService = async (data) => {
  try {
    let scheduleUpdated = {};
    let checkScheduleId = await db.Schedule.findOne({
      where: { id: data.id },
      raw: false,
    });
    if (checkScheduleId) {
      checkScheduleId.hospitalId = data.hospitalId;
      checkScheduleId.timeType = data.timeType;
      checkScheduleId.date = data.date;
      checkScheduleId.maxNumber = data.maxNumber;
      checkScheduleId.currentNumber = data.currentNumber;
      await checkScheduleId.save();
      let getScheduleInforAgain = await db.Schedule.findOne({
        where: { id: data.id },
        raw: true,
      });
      scheduleUpdated.content = getScheduleInforAgain;
      scheduleUpdated.statusCode = 200;
      scheduleUpdated.message = "Cập nhật thành công!";
    } else {
      scheduleUpdated.statusCode = 404;
      scheduleUpdated.message = "Không tìm thấy!";
    }
    return scheduleUpdated;
  } catch (e) {
    console.log("err update: ", e);
  }
};
module.exports = {
  bulkCreateScheduleService,
  getScheduleByDateService,
  createEventService,
  getEventByDateService,
  deleteEventService,
  updateEventService,
  getAllEventsService,
  getAllSchedulesService,
  deleteScheduleService,
  updateScheduleService,
  getScheduleByIdService,
  getEventByHospitalIdService,
  increaseCurrentNumberService,
  confirmBookingByHospitalService,
  getBookingsByDonorIdService,
  getAllBookingByHospitalIdService,
};
