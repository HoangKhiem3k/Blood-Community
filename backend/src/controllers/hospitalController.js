import hospitalService from "../services/hospitalService";
const getAllBookingByHospitalId = async (req, res) => {
  try {
    if (!req.query.hospitalId || !req.query.date) {
      res.status(422).json({
        statusCode: 422,
        message: "Thiếu thông số bắt buộc!",
      });
    } else {
      let resp = await hospitalService.getAllBookingByHospitalIdService(
        req.query.hospitalId,
        req.query.date
      );
      res.status(resp.statusCode).json(resp);
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
const handleGetBookingsByDonorId = async (req, res) => {
  try {
    if (!req.query) {
      res.status(422).json({
        statusCode: 422,
        message: "Thiếu thông số bắt buộc!",
      });
    } else {
      let resp = await hospitalService.getBookingsByDonorIdService(req.query);
      res.status(resp.statusCode).json(resp);
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
const handleConfirmBookingByHospital = async (req, res) => {
  try {
    if (!req.body) {
      res.status(422).json({
        statusCode: 422,
        message: "Thiếu thông số bắt buộc!",
      });
    } else {
      let status = await hospitalService.confirmBookingByHospitalService(
        req.body
      );
      res.status(status.statusCode).json(status);
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
const handleIncreaseCurrentNumber = async (req, res) => {
  try {
    if (!req.body) {
      res.status(422).json({
        statusCode: 422,
        message: "Thiếu thông số bắt buộc!",
      });
    } else {
      let status = await hospitalService.increaseCurrentNumberService(req.body);
      res.status(status.statusCode).json(status);
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleBulkCreateSchedule = async (req, res) => {
  try {
    if (!req.body) {
      res.status(422).json({
        statusCode: 422,
        message: "Thiếu thông số bắt buộc!",
      });
    } else {
      let infor = await hospitalService.bulkCreateScheduleService(req.body);
      res.status(infor.statusCode).json(infor);
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleCreateEvent = async (req, res) => {
  try {
    let infor = await hospitalService.createEventService(req.body);
    res.status(infor.statusCode).json(infor);
  } catch (e) {
    console.log(e);
    res.status(200).json({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetScheduleByDate = async (req, res) => {
  try {
    if (!req.query.hospitalId || !req.query.date) {
      res.status(422).json({
        statusCode: 422,
        message: "Thiếu thông số bắt buộc!",
      });
    } else {
      let infor = await hospitalService.getScheduleByDateService(
        req.query.hospitalId,
        req.query.date
      );
      res.status(infor.statusCode).json(infor);
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetScheduleById = async (req, res) => {
  try {
    if (!req.query.id) {
      res.status(422).json({
        statusCode: 422,
        message: "Thiếu thông số bắt buộc!",
      });
    } else {
      let infor = await hospitalService.getScheduleByIdService(req.query.id);
      res.status(infor.statusCode).json(infor);
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetEventByDate = async (req, res) => {
  try {
    if (!req.query.date) {
      res.status(422).json({
        statusCode: 422,
        message: "Thiếu thông số bắt buộc!",
      });
    } else {
      let infor = await hospitalService.getEventByDateService(req.query.date);
      res.status(infor.statusCode).json(infor);
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetEventByHospitalId = async (req, res) => {
  try {
    if (!req.query) {
      res.status(422).json({
        statusCode: 422,
        message: "Thiếu thông số bắt buộc!",
      });
    } else {
      let infor = await hospitalService.getEventByHospitalIdService(req.query);
      res.status(infor.statusCode).json(infor);
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleDeteleEvent = async (req, res) => {
  try {
    if (!req.body.id) {
      res.send({
        statusCode: 422,
        message: "Không thể xác định id của sự kiện!",
      });
    } else {
      let message = await hospitalService.deleteEventService(req.body.id);
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
let handleUpdateEvent = async (req, res) => {
  try {
    if (!req.body.id) {
      res.send({
        statusCode: 422,
        message: "Không thể xác định id của sự kiện!",
      });
    } else {
      let eventUpdated = await hospitalService.updateEventService(req.body);
      res.status(eventUpdated.statusCode).json(eventUpdated);
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetAllEvents = async (req, res) => {
  try {
    let events = await hospitalService.getAllEventsService();
    res.status(200).json({
      statusCode: 200,
      message: "Lấy thông tin các sự kiện thành công!",
      content: events,
    });
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetAllSchedules = async (req, res) => {
  try {
    let schedules = await hospitalService.getAllSchedulesService();
    res.status(200).json({
      statusCode: 200,
      message: "Lấy thông tin các lịch hẹn hiến máu thành công!",
      content: schedules,
    });
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleDeteleSchedule = async (req, res) => {
  try {
    if (!req.body.id) {
      res.send({
        statusCode: 422,
        message: "Không thể xác định id của lịch hẹn!",
      });
    } else {
      let message = await hospitalService.deleteScheduleService(req.body.id);
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
let handleUpdateSchedule = async (req, res) => {
  try {
    if (!req.body.id) {
      res.send({
        statusCode: 422,
        message: "Không thể xác định id của lịch hẹn!",
      });
    } else {
      let scheduleUpdated = await hospitalService.updateScheduleService(
        req.body
      );
      res.status(scheduleUpdated.statusCode).json(scheduleUpdated);
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
  handleBulkCreateSchedule,
  handleGetScheduleByDate,
  handleCreateEvent,
  handleGetEventByDate,
  handleUpdateEvent,
  handleDeteleEvent,
  handleGetAllEvents,
  handleGetAllSchedules,
  handleUpdateSchedule,
  handleDeteleSchedule,
  handleGetScheduleById,
  handleGetEventByHospitalId,
  handleIncreaseCurrentNumber,
  handleConfirmBookingByHospital,
  handleGetBookingsByDonorId,
  getAllBookingByHospitalId,
};
