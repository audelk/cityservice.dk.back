import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import MyRouteService from "../services/myRoute.service.js";
import BookingService from "../services/booking.service.js";
const create = catchAsync(
    async (req, res) => {
        const rec = await MyRouteService.create(req.body);
        res.status(httpStatus.CREATED).send(rec);
    }
);
const addDestination = catchAsync(
    async (req, res) => {
        const { routeId, destinationId } = req.body;
        const rec = await MyRouteService.addIdToChildren({ id: routeId, childId: destinationId, childName: "destination" });
        await BookingService.addIdToChildren({ id: destinationId, childId: routeId, childName: "routes" });
        await rec.populate("destination");
        res.status(httpStatus.CREATED).send(rec.destination);
    }
);
const removeDestination = catchAsync(
    async (req, res) => {
        const { routeId, destinationId } = req.body;
        const rec = await MyRouteService.removeChildById({ id: routeId, childId: destinationId, childName: "destination" });
        await BookingService.removeChildById({ id: destinationId, childId: routeId, childName: "routes" });
        await rec.populate("destination");
        res.status(httpStatus.CREATED).send(rec.destination);
    }
);
const remove = catchAsync(
    async (req, res) => {
        const rec = await MyRouteService.deleteById(req.params.id);
        res.status(httpStatus.OK).send({});
    }
);
const geoCode = catchAsync(
    async (req, res) => {
        const results = await BookingService.geoCodeAddress(req.body.address);
        if (results.length > 0) {
            const { longitude, latitude } = results[0];

            res.status(httpStatus.OK).send({ longitude, latitude });
        }
        else {
            throw new ApiError(httpStatus.BAD_REQUEST, "BAD_REQUEST");
        }
    }
);
const update = catchAsync(
    async (req, res) => {
        const rec = await MyRouteService.updateById(req.params.id, req.body);
        res.status(httpStatus.OK).send({});
    }
);
const updateMyLocation = catchAsync(
    async (req, res) => {
        const rec = await MyRouteService.updateById(req.params.id, {
            myLocation: req.body
        });
        await rec.populate("destination");
        res.status(httpStatus.OK).send(rec);
    }
);
const getData = catchAsync(
    async (req, res) => {
        const rec = await MyRouteService.getDataById(req.params.id);
        await rec.populate("destination");
        res.status(httpStatus.OK).send(rec);
    }
);

const list = catchAsync(
    async (req, res) => {
        const { filterByStatus, sortBy, sortType = "desc", keyword, limit = 10, page, status } = req.query;
        let querySort;
        let filter;
        if (filterByStatus) {
            let filters = filterByStatus.split(',').map(item => { return { status: item } });
            filter = { $or: filters };
        }

        if (status) {
            let filters = status.split(',').map(item => { return { status: item } });
            filter = { $or: filters };
        }
        if (sortBy) {
            querySort = `${sortBy}:${sortType}`;
        }
        else
            querySort = `createdAt:${sortType}`;
        if (keyword) {
            if (filter)
                filter['$and'] = [{ "name": { '$regex': '.*' + keyword.trim() + '.*' } }];
            else
                filter = { $or: [{ "name": { '$regex': '.*' + keyword.trim() + '.*' } }] };
        };
        const result = await MyRouteService.list(filter, { sortBy: querySort, limit, page });
        res.send(result);
    }
)
export const MyRouteController = {
    create, remove, update, list, addDestination, getData, removeDestination, geoCode, updateMyLocation
}

export default MyRouteController;