const Admin = require("../models/admin");

const Run = () => {
  let password = "$2a$12$CNB3wWairoFD2E2gv7sswOnDI4UUgWN/L3b.eSluuIF.56Jg2Ztz6"; //admin@123456
  let adminDetails = {
    name: "Admin",
    email: "admin@gmail.com",
    $setOnInsert: { password },
  };

  createAdmin(adminDetails);
};

const createAdmin = async (adminDetails) => {
  try {
    const admin = await Admin.findOneAndUpdate(
      { email: adminDetails.email },
      adminDetails,
      { new: true, lean: true, upsert: true }
    );

    return admin;
  } catch (error) {
    console.log("****************************", error);
  }
};

module.exports = Run;
