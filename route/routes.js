const express = require("express");
const { createUser, getAllUsers, loginUser, logout, forgotPassword, getUserDetails, updatePassword, updateProfile,getSingleUser, updateUserRole, deleteUser, verifyEmail, resetPassword, updateAvatar } = require("../Controllers/user");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const { newOrder } = require("../Controllers/order");
const { createBus, getAllBuses, busDetails } = require("../Controllers/bus");

const router = express.Router();

// users routes
router.route("/register").post(createUser);
// router.route("/activation").post(verifyEmail);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/currentUserDetails").get(isAuthenticatedUser, getUserDetails);
router.route("/updatePassword").put(isAuthenticatedUser, updatePassword);
router.route("/update/currentUserdetails").put(isAuthenticatedUser, updateProfile);
router.route("/update/avatar").put(isAuthenticatedUser, updateAvatar);
router.route("/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router.route("/admin/user/:id")
.get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
.put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
.delete( deleteUser);

// bus routes
router.route("/create-bus").post( createBus);
router.route("/buses").get(getAllBuses);
router.route('/bus/:id').get(busDetails);

router.route("/order/new").post(isAuthenticatedUser, newOrder);



module.exports = router;