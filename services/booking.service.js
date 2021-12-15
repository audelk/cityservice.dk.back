import httpStatus from "http-status";
import { Booking } from "../models/booking.model.js";
import { User } from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import node_geocoder from "node-geocoder";
const geoCoderOptions = {
    provider: 'opencage',
    // Optional depending on the providers
    //fetch: customFetchImplementation,    
    apiKey: 'c700e8239b824eb6834b932927bdef0c', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};
const create = async (body) => {

    return Booking.create(body)
}

const list = async (filter, options) => {
    const bookings = await Booking.paginate(filter, options);
    return bookings;
}
const getById = async (id) => {
    const record = Booking.findById(id);
    if (!record) {
        throw new ApiError(httpStatus.NOT_FOUND, 'RECORD_NOT_FOUND');
    }
    return record;
}

const updateById = async (body) => {
    const { id, type, data } = body;
    const record = await Booking.findById(id);
    if (!record) {
        throw new ApiError(httpStatus.NOT_FOUND, 'RECORD_NOT_FOUND');
    }
    if (type == "booking") {
        Object.assign(record, data);
        await record.save()
    }
    return record;
}
const geoCodeAddress = async (address) => {
    const geocoder = node_geocoder(geoCoderOptions);
    const res = await geocoder.geocode(address);
    return res;
}

const bookingService = {
    create, list, geoCodeAddress, updateById, getById
}


export default bookingService;