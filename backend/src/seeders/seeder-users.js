("use strict");

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let passwordHash = bcrypt.hashSync(
      "capstone1_c1se14",
      bcrypt.genSaltSync(10)
    );
    return queryInterface.bulkInsert("Users", [
      {
        email: "adminCS14@gmail.com",
        password: passwordHash,
        roleId: "R1",
        firstName: "Group",
        lastName: "CS1.14",
        hospitalName: "",
        gender: "Other",
        birthday: "",
        district: "",
        city: "",
        address: "",
        phoneNumber: "0348597672",
        image: "",
        groupBlood: "a",
        numberOfDonation: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "hospital@gmail.com",
        password: passwordHash,
        roleId: "R2",
        firstName: "Hospital",
        lastName: "CS1.14",
        hospitalName: "Hospital 1",
        gender: "Other",
        birthday: "",
        district: "",
        city: "",
        address: "",
        phoneNumber: "0348597672",
        image: "",
        groupBlood: "a",
        numberOfDonation: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "donor@gmail.com",
        password: passwordHash,
        roleId: "R3",
        firstName: "Donor",
        lastName: "CS1.14",
        hospitalName: "",
        gender: "Other",
        birthday: "",
        district: "",
        city: "",
        address: "",
        phoneNumber: "0348597672",
        image: "",
        groupBlood: "a",
        numberOfDonation: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "recipient@gmail.com",
        password: passwordHash,
        roleId: "R4",
        firstName: "Group",
        lastName: "CS1.14",
        hospitalName: "",
        gender: "Other",
        birthday: "",
        district: "",
        city: "",
        address: "",
        phoneNumber: "0348597672",
        image: "",
        groupBlood: "a",
        numberOfDonation: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "ledohoangkhiem3k@gmail.com",
        password: passwordHash,
        roleId: "R3",
        firstName: "Khiem",
        lastName: "Le",
        hospitalName: "",
        gender: "Other",
        birthday: "",
        district: "",
        city: "",
        address: "",
        phoneNumber: "0348597672",
        image: "",
        groupBlood: "a",
        numberOfDonation: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
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
