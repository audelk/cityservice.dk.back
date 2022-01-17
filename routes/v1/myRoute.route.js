import express from "express";
import validate from "../../middlewares/validate.js";
import MyRouteValidation from "../../validations/myRoute.validation.js";
import MyRouteController from "../../controllers/myRoute.controller.js";
const SearchRoute = express.Router();

SearchRoute
    .route('/')
    .post(validate(MyRouteValidation.create), MyRouteController.create)
    .get(validate(MyRouteValidation.list), MyRouteController.list);
SearchRoute
    .route('/geoCode')
    .post(validate(MyRouteValidation.geoCode), MyRouteController.geoCode);
SearchRoute
    .route('/destination')
    .delete(validate(MyRouteValidation.removeDestination), MyRouteController.removeDestination)
    .post(validate(MyRouteValidation.addDestination), MyRouteController.addDestination);
SearchRoute
    .route('/:id')
    .delete(validate(MyRouteValidation.remove), MyRouteController.remove)
    .put(validate(MyRouteValidation.update), MyRouteController.update)
    .get(validate(MyRouteValidation.remove), MyRouteController.getData);
SearchRoute
    .route('/:id/myLocation')
    .put(validate(MyRouteValidation.updateMyLocation), MyRouteController.updateMyLocation)
export default SearchRoute