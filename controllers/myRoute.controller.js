import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import MyRouteService from "../services/myRoute.service.js";
const create = catchAsync(
    async (req, res) => {
        const rec = await MyRouteService.create(req.body);
        res.status(httpStatus.CREATED).send(rec);
    }
);
const remove = catchAsync(
    async (req, res) => {
        const rec = await MyRouteService.deleteById(req.params.id);
        res.status(httpStatus.OK).send({});
    }
);
const update = catchAsync(
    async (req, res) => {
        const rec = await MyRouteService.updateById(req.params.id, req.body);
        res.status(httpStatus.OK).send({});
    }
);

const list = catchAsync(
    async (req, res) => {
        const { sortBy, sortType = "desc", keyword, limit = 10, page, status } = req.query;
        let querySort;
        let filter;
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
    create, remove, update, list
}

export default MyRouteController;