("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Allcodes", [
      {
        type: "ROLE",
        keyMap: "R1",
        valueEn: "Admin",
        valueVi: "Quản trị viên",
      },
      {
        type: "ROLE",
        keyMap: "R2",
        valueEn: "Hospital",
        valueVi: "Bệnh viện",
      },
      {
        type: "ROLE",
        keyMap: "R3",
        valueEn: "Donor",
        valueVi: "Người hiến máu",
      },{
        type: "ROLE",
        keyMap: "R4",
        valueEn: "Recipient",
        valueVi: "Người nhận máu",
      },{
        type: "STATUS",
        keyMap: "S1",
        valueEn: "New",
        valueVi: "Lịch hẹn mới",
      },{
        type: "STATUS",
        keyMap: "S2",
        valueEn: "Confirmed",
        valueVi: "Đã xác nhận",
      },{
        type: "STATUS",
        keyMap: "S3",
        valueEn: "Done",
        valueVi: "Đã hoàn thành",
      },{
        type: "STATUS",
        keyMap: "S4",
        valueEn: "Cancel",
        valueVi: "Đã hủy",
      },{
        type: "TIME",
        keyMap: "T1",
        valueEn: "8:00 AM - 9:00 AM",
        valueVi: "8:00 - 9:00",
      },{
        type: "TIME",
        keyMap: "T2",
        valueEn: "9:00 AM - 10:00 AM",
        valueVi: "9:00 - 10:00",
      },{
        type: "TIME",
        keyMap: "T3",
        valueEn: "10:00 AM - 11:00 AM",
        valueVi: "10:00 - 11:00",
      },{
        type: "TIME",
        keyMap: "T4",
        valueEn: "11:00 AM - 0:00 PM",
        valueVi: "11:00 - 12:00",
      },{
        type: "TIME",
        keyMap: "T5",
        valueEn: "1:00 PM - 2:00 PM",
        valueVi: "13:00 - 14:00",
      },{
        type: "TIME",
        keyMap: "T6",
        valueEn: "2:00 PM - 3:00 PM",
        valueVi: "14:00 - 15:00",
      },{
        type: "TIME",
        keyMap: "T7",
        valueEn: "3:00 PM - 4:00 PM",
        valueVi: "15:00 - 16:00",
      },{
        type: "TIME",
        keyMap: "T8",
        valueEn: "4:00 PM - 5:00 PM",
        valueVi: "16:00 - 17:00",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
