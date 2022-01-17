import httpStatus from "http-status";
import Model from "../models/myRoute.model.js";
import ApiError from "../utils/ApiError.js";
import { RECORD_CANNOT_BE_MODIFIED, RECORD_NOT_FOUND } from "../constants/errorMessages.js";


const create = async (fields) => {
    return Model.create(fields);
};
const addIdToChildren = async ({ id, childId, childName }) => {
    const rec = await Model.findById(id);
    if (!rec)
        throw new ApiError(httpStatus.NOT_FOUND, RECORD_NOT_FOUND);
    rec[childName].addToSet(childId);
    rec.markModified(childName);
    await rec.save();
    return rec;
};
const removeChildById = async ({ id, childId, childName }) => {
    const rec = await Model.findById(id);
    if (!rec)
        throw new ApiError(httpStatus.NOT_FOUND, RECORD_NOT_FOUND);
    rec[childName].pull(childId);
    rec.markModified(childName);
    await rec.save();
    return rec;
};
const updateById = async (id, fields) => {
    const rec = await Model.findById(id);
    if (!rec)
        throw new ApiError(httpStatus.NOT_FOUND, RECORD_NOT_FOUND);
    // if (rec.status != 'ready')
    //  throw new ApiError(httpStatus.BAD_REQUEST, RECORD_CANNOT_BE_MODIFIED);
    Object.assign(rec, fields);
    await rec.save();
    return rec;
};
const getDataById = async (id) => {
    const rec = await Model.findById(id);
    if (!rec)
        throw new ApiError(httpStatus.NOT_FOUND, RECORD_NOT_FOUND);

    return rec;
};
const deleteById = async (id) => {
    const rec = await Model.findByIdAndDelete(id);
    if (!rec)
        throw new ApiError(httpStatus.NOT_FOUND, RECORD_NOT_FOUND);
    return rec;
};

const list = async (filter, options) => {
    const records = await Model.paginate(filter, options);
    return records;
};

export const MyRouteService = {
    create,
    updateById,
    deleteById,
    list, addIdToChildren, getDataById, removeChildById
}

export default MyRouteService;