const Klass = require("../models/klass");

const findClass = async (condition) => {
  const klass = await Klass.findOne(condition);
  return klass;
};

const getDetailClass = async (id) => {
  const klass = await Klass.findById(id)
    .populate({ path: "teacherId", select: "username email" })
    .populate({ path: "studentId", select: "username email avatar" })
    .populate("activity");
  return klass;
};

const getListClassOfTeacher = async (teacherId) => {
  const listClass = await Klass.find({ teacherId });
  return listClass;
};

const getListClassOfStudent = async (studentId) => {
  const listClass = await Klass.find({ studentId: { $in: [studentId] } });
  return listClass;
};

const updateClass = async (condition, data) => {
  const klass = await Klass.findOneAndUpdate(condition, data, { new: true });
  return klass;
};

const deleteClass = async (id) => {
  await Klass.findByIdAndDelete(id);
};

const addClass = async ({
  teacherId,
  code,
  name,
  startTime,
  endTime,
  duration,
}) => {
  const klass = await Klass.create({
    teacherId,
    code,
    name,
    startTime,
    endTime,
    duration,
  });
  return klass;
};

module.exports = {
  findClass,
  getListClassOfStudent,
  getListClassOfTeacher,
  updateClass,
  deleteClass,
  addClass,
  getDetailClass,
};
