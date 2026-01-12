import * as __WEBPACK_EXTERNAL_MODULE_moment__ from "moment";
import * as __WEBPACK_EXTERNAL_MODULE_class_transformer_c5a479fb__ from "class-transformer";
import * as __WEBPACK_EXTERNAL_MODULE_tslib__ from "tslib";
import * as __WEBPACK_EXTERNAL_MODULE_typeorm__ from "typeorm";
import * as __WEBPACK_EXTERNAL_MODULE_reflect_metadata_121e451c__ from "reflect-metadata";
import * as __WEBPACK_EXTERNAL_MODULE_adminjs__ from "adminjs";
import * as __WEBPACK_EXTERNAL_MODULE__adminjs_express_eb1684de__ from "@adminjs/express";
import * as __WEBPACK_EXTERNAL_MODULE_express__ from "express";
import * as __WEBPACK_EXTERNAL_MODULE__adminjs_typeorm_691da027__ from "@adminjs/typeorm";
import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "node:module";
const __WEBPACK_EXTERNAL_createRequire_require = __WEBPACK_EXTERNAL_createRequire(import.meta.url);
import * as __WEBPACK_EXTERNAL_MODULE__adminjs_upload_c494aec7__ from "@adminjs/upload";
import * as __WEBPACK_EXTERNAL_MODULE_fs_extra_e95eee4a__ from "fs-extra";
import * as __WEBPACK_EXTERNAL_MODULE_express_mysql_session_3dcff3af__ from "express-mysql-session";
import * as __WEBPACK_EXTERNAL_MODULE_express_session_d2460649__ from "express-session";
/******/ var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  GraphData: () => (/* binding */ GraphData),
  GraphDataFeatureIndexed: () => (/* binding */ GraphDataFeatureIndexed),
  Platform: () => (/* binding */ Platform)
});
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "tslib"
var external_tslib_ = __webpack_require__(2);
// EXTERNAL MODULE: external "typeorm"
var external_typeorm_ = __webpack_require__(3);
// EXTERNAL MODULE: ../shared/models/Country.ts
var Country = __webpack_require__(4);
;// external "moment"
const external_moment_namespaceObject = __WEBPACK_EXTERNAL_MODULE_moment__;
;// ../shared/models/PlatformData.ts

class PlatformFeature {
    constructor(data) {
        if (!!data?.yw) {
            this.week = Number(data.yw.toString().slice(-2));
            this.year = Number(data.yw.toString().slice(0, 4));
            this.month = (0,external_moment_namespaceObject["default"])().day("Monday").year(this.year).isoWeek(this.week).toDate().getMonth();
            this.isFirstOfMonth = (0,external_moment_namespaceObject["default"])().year(this.year).month(this.month).startOf('month').isoWeekday(8).isoWeek() === this.week;
        }
        if (data.dataType)
            this.dataType = data.dataType;
    }
    year;
    week;
    month;
    isFirstOfMonth;
    dataType;
    value;
    min;
    max;
    index;
    static statsToIndex(season, syndrome, variable, dataType) {
        // index format: season|syndrome|variable, null value are set to _
        return `${dataType && dataType === 'visits_cumulated' ? '_' : (season || '_')}|${syndrome || '_'}|${variable || '_'}`;
    }
    static indexToStats(index) {
        // index format: season|syndrome|variable, null value are set to _
        let indexComponents = index.split('|');
        return {
            season: indexComponents[0] !== '_' ? indexComponents[0] : undefined,
            syndrome: indexComponents[1] !== '_' ? indexComponents[1] : undefined,
            variable: indexComponents[2] !== '_' ? indexComponents[2] : undefined,
        };
    }
}
class PlatformData {
    constructor(data) { Object.assign(this, data); }
    active;
    incidence;
    visits_cumulated;
}
class PlatformDataActive extends PlatformFeature {
    constructor(data) {
        super(data);
        Object.assign(this, data);
        this.value = this.value || this.active;
    }
    active;
    method;
    season;
    syndrome;
    yw;
}
class PlatformDataIncidence extends PlatformFeature {
    constructor(data) {
        super(data);
        Object.assign(this, data);
        this.min = this.lower * 1000;
        this.value = this.incidence * 1000;
        this.max = this.upper * 1000;
    }
    active;
    count;
    incidence;
    lower;
    method;
    part;
    season;
    syndrome;
    type;
    upper;
    yw;
}
class PlatformDataVisitsCumulated extends PlatformFeature {
    constructor(data) {
        super(data);
        Object.assign(this, data);
        this.min = this.cum_prop_adj_low * 100;
        this.value = this.cum_prop_adj * 100;
        this.max = this.cum_prop_adj_up * 100;
    }
    cum_prop_adj;
    cum_prop_adj_low;
    cum_prop_adj_up;
    cum_prop_raw;
    number;
    n_adj;
    n_missing;
    n_total;
    n_weight;
    prop_adj;
    prop_adj_low;
    prop_adj_up;
    prop_raw;
    season;
    syndrome;
    total_adj;
    total_weight;
    variable;
    yw;
}

// EXTERNAL MODULE: ../shared/models/UploadedFile.ts
var UploadedFile = __webpack_require__(6);
;// external "class-transformer"
const external_class_transformer_namespaceObject = __WEBPACK_EXTERNAL_MODULE_class_transformer_c5a479fb__;
;// ../shared/models/Platform.ts
var _a, _b, _c, _d, _e;






let Platform = class Platform extends external_typeorm_.BaseEntity {
    constructor(id, name, description, website, filePrefix, country, countryId, partners, data, logo) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.website = website;
        this.filePrefix = filePrefix;
        this.country = country;
        this.countryId = countryId;
        this.partners = partners;
        this.data = data;
        this.logo = logo;
        this.graphData = this.graphData || new GraphData();
    }
    id;
    name;
    description;
    filePrefix;
    hidden;
    order;
    about;
    website;
    websiteJoinLink;
    logo;
    country;
    countryId;
    partners;
    data;
    graphData;
    get filePath() {
        return `/public/upload/${this.logo?.key}`;
    }
};
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.PrimaryGeneratedColumn)(),
    (0,external_tslib_.__metadata)("design:type", Number)
], Platform.prototype, "id", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)(),
    (0,external_tslib_.__metadata)("design:type", String)
], Platform.prototype, "name", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)(),
    (0,external_tslib_.__metadata)("design:type", String)
], Platform.prototype, "description", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)(),
    (0,external_tslib_.__metadata)("design:type", String)
], Platform.prototype, "filePrefix", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)({ default: false, nullable: false, type: 'boolean' }),
    (0,external_tslib_.__metadata)("design:type", Boolean)
], Platform.prototype, "hidden", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)({ default: 100 }),
    (0,external_tslib_.__metadata)("design:type", Number)
], Platform.prototype, "order", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)({ nullable: true }),
    (0,external_tslib_.__metadata)("design:type", String)
], Platform.prototype, "about", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)({ nullable: true }),
    (0,external_tslib_.__metadata)("design:type", String)
], Platform.prototype, "website", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)({ nullable: true }),
    (0,external_tslib_.__metadata)("design:type", String)
], Platform.prototype, "websiteJoinLink", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)({ nullable: true, type: 'json' }),
    (0,external_tslib_.__metadata)("design:type", typeof (_d = typeof UploadedFile.UploadedFile !== "undefined" && UploadedFile.UploadedFile) === "function" ? _d : Object)
], Platform.prototype, "logo", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.ManyToOne)('country', 'platforms'),
    (0,external_tslib_.__metadata)("design:type", typeof (_e = typeof Country.Country !== "undefined" && Country.Country) === "function" ? _e : Object)
], Platform.prototype, "country", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.RelationId)((platform) => platform.country),
    (0,external_typeorm_.Column)(),
    (0,external_tslib_.__metadata)("design:type", Number)
], Platform.prototype, "countryId", void 0);
(0,external_tslib_.__decorate)([
    (0,external_class_transformer_namespaceObject.Type)(() => (__webpack_require__(5).Partner)),
    (0,external_typeorm_.OneToMany)('partner', 'platform'),
    (0,external_tslib_.__metadata)("design:type", Array)
], Platform.prototype, "partners", void 0);
Platform = (0,external_tslib_.__decorate)([
    (0,external_typeorm_.Entity)({ name: 'platform' }),
    (0,external_tslib_.__metadata)("design:paramtypes", [Number, String, String, String, String, typeof (_a = typeof Country.Country !== "undefined" && Country.Country) === "function" ? _a : Object, Number, Array, typeof (_b = typeof PlatformData !== "undefined" && PlatformData) === "function" ? _b : Object, Object])
], Platform);

class GraphDataFeatureIndexed {
    constructor(data) { Object.assign(this, data); }
}
class GraphData {
    constructor(data) {
        data && Object.assign(this, data);
        this.active = this.active || new GraphDataFeatureIndexed();
        this.incidence = this.incidence || new GraphDataFeatureIndexed();
        this.visits_cumulated = this.visits_cumulated || new GraphDataFeatureIndexed();
    }
    active;
    incidence;
    visits_cumulated;
}


/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_tslib__;

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_typeorm__;

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Country: () => (/* binding */ Country)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
var _a, _b;


let Country = class Country extends typeorm__WEBPACK_IMPORTED_MODULE_1__.BaseEntity {
    constructor(data) {
        super();
        Object.assign(this, data);
    }
    id;
    name;
    hidden;
    // @OneToMany(() => Platform, (platform: Platform) => platform.country)
    platforms;
};
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_1__.PrimaryGeneratedColumn)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Number)
], Country.prototype, "id", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_1__.Column)({ nullable: false, unique: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], Country.prototype, "name", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_1__.Column)({ default: false, nullable: false, type: 'boolean' }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Boolean)
], Country.prototype, "hidden", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_1__.OneToMany)('platform', 'country'),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_b = typeof Array !== "undefined" && Array) === "function" ? _b : Object)
], Country.prototype, "platforms", void 0);
Country = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_1__.Entity)({ name: 'country' }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object])
], Country);



/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Partner: () => (/* binding */ Partner)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _Platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _models_UploadedFile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
var _a, _b, _c;




let Partner = class Partner extends typeorm__WEBPACK_IMPORTED_MODULE_1__.BaseEntity {
    constructor(Partner) {
        super();
        Object.assign(this, Partner);
    }
    id;
    name;
    hidden;
    logo;
    website;
    description;
    order = 100;
    platform;
    platformId;
};
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_1__.PrimaryGeneratedColumn)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Number)
], Partner.prototype, "id", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_1__.Column)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], Partner.prototype, "name", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_1__.Column)({ default: false, nullable: false, type: 'boolean' }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Boolean)
], Partner.prototype, "hidden", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_1__.Column)({ nullable: true, type: 'json' }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_b = typeof _models_UploadedFile__WEBPACK_IMPORTED_MODULE_3__.UploadedFile !== "undefined" && _models_UploadedFile__WEBPACK_IMPORTED_MODULE_3__.UploadedFile) === "function" ? _b : Object)
], Partner.prototype, "logo", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_1__.Column)({ nullable: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], Partner.prototype, "website", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_1__.Column)({ nullable: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", String)
], Partner.prototype, "description", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_1__.Column)({ default: 100, nullable: true }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Number)
], Partner.prototype, "order", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_1__.ManyToOne)('platform', 'partner'),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", typeof (_c = typeof _Platform__WEBPACK_IMPORTED_MODULE_2__.Platform !== "undefined" && _Platform__WEBPACK_IMPORTED_MODULE_2__.Platform) === "function" ? _c : Object)
], Partner.prototype, "platform", void 0);
(0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_1__.Column)(),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:type", Number)
], Partner.prototype, "platformId", void 0);
Partner = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,typeorm__WEBPACK_IMPORTED_MODULE_1__.Entity)({ name: 'partner' }),
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__metadata)("design:paramtypes", [typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object])
], Partner);



/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UploadedFile: () => (/* binding */ UploadedFile)
/* harmony export */ });
class UploadedFile {
    key;
    mime;
    size;
    bucket;
    filename;
}


/***/ })
/******/ ]);
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {

;// external "reflect-metadata"
const external_reflect_metadata_namespaceObject = __WEBPACK_EXTERNAL_MODULE_reflect_metadata_121e451c__;
;// external "adminjs"
const external_adminjs_namespaceObject = __WEBPACK_EXTERNAL_MODULE_adminjs__;
;// external "@adminjs/express"
const express_namespaceObject = __WEBPACK_EXTERNAL_MODULE__adminjs_express_eb1684de__;
;// external "express"
const external_express_namespaceObject = __WEBPACK_EXTERNAL_MODULE_express__;
;// external "@adminjs/typeorm"
const typeorm_namespaceObject = __WEBPACK_EXTERNAL_MODULE__adminjs_typeorm_691da027__;
;// ./src/components/component-loader.ts

const componentLoader = new external_adminjs_namespaceObject.ComponentLoader();
const CustomComponents = {
    Dashboard: componentLoader.add('Dashboard', './components/Dashboard.tsx'),
    RichText: componentLoader.override('DefaultRichtextEditProperty', './components/TinyMCE.tsx'),
    Label: componentLoader.override('PropertyLabel', './components/CustomLabel.tsx'),
    Login: componentLoader.override('Login', './components/Login.tsx'),
};

// EXTERNAL MODULE: ../shared/models/Platform.ts + 3 modules
var Platform = __webpack_require__(1);
;// external "path"
const external_path_namespaceObject = __WEBPACK_EXTERNAL_createRequire_require("path");
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_namespaceObject);
;// ./src/models/validators/required.ts

const required = async (request, context) => {
    const payload = request.payload;
    const resource = context.resource;
    const properties = resource.properties();
    // Filter only the columns that need to be validated
    const columns = properties.filter((property) => {
        let noDefaultValue = property.column.default === undefined;
        let notBoolean = property.type() !== 'boolean';
        let notPrimary = !property.isId();
        return notPrimary && noDefaultValue && notBoolean;
    });
    // Generate the error object
    return columns.reduce((acc, property) => {
        const propertyName = property.name();
        const entityName = resource.id();
        if (!property.column.isNullable && !payload[propertyName]) {
            acc[propertyName] = { message: `This field is required`, type: external_adminjs_namespaceObject.ErrorTypeEnum.Validation };
        }
        return acc;
    }, {});
};

;// ./src/models/validators/unique.ts

const unique = async (request, context) => {
    // Only check for actions that require unique validation
    if (!['edit', 'new'].includes(request.params.action))
        return {};
    // Get resource and properties
    const resource = context.resource;
    const properties = resource.properties();
    // Get field that should be unique
    const columns = properties.filter((property) => {
        const hasPayload = request.payload[property.name()] !== undefined;
        const shouldBeUnique = property.column.entityMetadata.ownIndices
            .some((index) => index.isUnique && index.columns.length === 1 && index.columns[0].propertyName === property.name());
        return hasPayload && shouldBeUnique;
    });
    const errors = {};
    // Check which fields are not unique and add error
    for (const property of columns) {
        const propertyName = property.name();
        const entityName = resource.id();
        const where = { [propertyName]: request.payload[propertyName] };
        // Check for unique
        let uniqueQuery = await resource.find(new external_adminjs_namespaceObject.Filter(where, resource), { sort: { sortBy: 'id' } });
        const notUnique = uniqueQuery.filter(record => record.id().toString() !== (request.params.recordId || -1)).length > 0;
        if (notUnique)
            errors[propertyName] =
                { message: `A ${entityName} with the same field already exists`, type: external_adminjs_namespaceObject.ErrorTypeEnum.Validation };
    }
    return errors;
};

;// ./src/models/validators/validate.ts



const validate = async (request, context) => {
    if (request.method === 'get')
        return request;
    const requiredColumns = await required(request, context);
    const uniqueColumns = await unique(request, context);
    const errors = { ...uniqueColumns, ...requiredColumns };
    if (Object.keys(errors).length)
        throw new external_adminjs_namespaceObject.ValidationError(errors);
    else
        return request;
};

;// external "@adminjs/upload"
const upload_namespaceObject = __WEBPACK_EXTERNAL_MODULE__adminjs_upload_c494aec7__;
;// external "fs"
const external_fs_namespaceObject = __WEBPACK_EXTERNAL_createRequire_require("fs");
;// external "fs-extra"
const external_fs_extra_namespaceObject = __WEBPACK_EXTERNAL_MODULE_fs_extra_e95eee4a__;
;// ./src/logger.ts
class Logger {
    log(message) {
        console.log(`${'\x1b[32m'}[AdminJS]${'\x1b[0m'} - ${this.timeStamp()} - ${'\x1b[32m'}${message}`, '\x1b[0m');
    }
    warn(message) {
        console.log(`${'\x1b[33m'}[AdminJS]${'\x1b[0m'} - ${this.timeStamp()} - ${'\x1b[33m'}${message}`, '\x1b[0m');
    }
    error(message, error) {
        console.log(`${'\x1b[31m'}[AdminJS]${'\x1b[0m'} - ${this.timeStamp()} - ${'\x1b[31m'}${message}`, '\x1b[0m');
        console.log(`${'\x1b[31m'} ${error}`, '\x1b[0m');
    }
    info(message) {
        console.log(`${'\x1b[36m'}[AdminJS]${'\x1b[0m'} - ${this.timeStamp()} - ${'\x1b[36m'}${message}`, '\x1b[0m');
    }
    timeStamp() {
        return (new Date()).toLocaleString('en-US');
    }
}
const logger = new Logger();

;// ./src/provider/UploadLocalProvider.ts






class UploadLocalProvider extends upload_namespaceObject.BaseProvider {
    constructor(options) {
        super(options.bucket, options.opts);
        if (!(0,external_fs_namespaceObject.existsSync)(options.bucket)) {
            logger.error(`ERROR upload bucket does not exist at ${options.bucket}`);
        }
    }
    async upload(file, key) {
        try {
            const temporaryPath = file.path;
            const destinationPath = this.serverPath(key);
            await (0,external_fs_extra_namespaceObject.ensureDir)(external_path_namespaceObject.dirname(destinationPath));
            await (0,external_fs_extra_namespaceObject.move)(temporaryPath, destinationPath, { overwrite: true });
        }
        catch (e) {
            logger.error('ERROR uploading file', e);
        }
    }
    async delete(filePath, bucket) {
        try {
            await external_fs_namespaceObject.promises.unlink(this.serverPath(filePath, bucket));
        }
        catch (e) {
            logger.error('ERROR deleting file', e);
        }
    }
    serverPath(filePath, bucket = this.bucket) {
        return `${external_path_namespaceObject.join(this.bucket, filePath)}`;
    }
    path(filePath, bucket = this.bucket) {
        try {
            let assetsBaseUrl = this.opts.baseUrl;
            return `${external_path_namespaceObject.join(assetsBaseUrl, filePath)}`;
        }
        catch (e) {
            logger.error('ERROR computing file path', e);
        }
    }
}

;// ./src/__dirname.ts

const _dirname_dirname = process.env.NODE_ENV === 'development'
    ? '/app/dist/apps/admin'
    : external_path_default().resolve();

;// ./src/models/helpers/helpers.ts
const elementsPerPage = async (request, context) => {
    request.query.perPage = 100;
    return request;
};

;// ./src/models/PlatformAdmin.ts








const PlatformAdmin = {
    resource: Platform.Platform,
    options: {
        titleProperty: 'name',
        properties: {
            id: { isVisible: false },
            name: {
                type: 'string',
                position: 10,
                isSortable: true,
                custom: { isRequired: true }
            },
            countryId: {
                position: 15,
                isSortable: true,
                custom: { isRequired: true }
            },
            hidden: {
                type: 'boolean',
                position: 20,
                isSortable: true,
            },
            filePrefix: {
                type: 'string',
                position: 25,
                custom: { isRequired: true },
                description: `CSV files prefix. (EG: IT for "IT_active.csv", "IT_incidence.csv" and "IT_visits_cumulated.csv")`
            },
            website: {
                type: 'string',
                position: 30,
                isVisible: { list: false, show: true, edit: true },
            },
            websiteJoinLink: {
                type: 'string',
                position: 35,
                isVisible: { list: false, show: true, edit: true },
            },
            order: {
                type: 'number',
                position: 40,
                isSortable: true,
            },
            description: {
                type: 'richtext',
                position: 70,
                custom: { isRequired: true },
                isVisible: { list: false, show: true, edit: true },
            },
            about: {
                type: 'richtext',
                position: 75,
                isVisible: { list: false, show: true, edit: true },
            },
            logo: {
                type: 'mixed',
                isVisible: true,
                position: 80,
                isSortable: true
            },
            filePath: { isVisible: false }
        },
        actions: {
            show: { isAccessible: false },
            new: { before: validate },
            edit: { before: validate },
            list: { before: elementsPerPage }
        },
        sort: {
            sortBy: 'order',
            direction: 'asc',
        },
        navigation: {
            // icon: 'Webhook',
            icon: 'Target',
        }
    },
    features: [
        (0,upload_namespaceObject["default"])({
            componentLoader: componentLoader,
            provider: new UploadLocalProvider({
                bucket: external_path_default().join(_dirname_dirname, '/assets/upload'),
                opts: { baseUrl: '/assets/upload' },
            }),
            properties: {
                file: `logo`,
                key: `logo.key`,
                mimeType: `logo.mime`,
                bucket: `logo.bucket`,
                size: `logo.size`,
                filename: 'logo.filename',
            },
            validation: {
                // @TODO: make it work with svg
                mimeTypes: ['image/png', 'image/jpg', 'image/jpeg', /*'image/svg+xml'*/],
                maxSize: 10485760
            },
            uploadPath: (record, filename) => `logo/platform/${filename}`
        })
    ]
};

// EXTERNAL MODULE: ../shared/models/Country.ts
var Country = __webpack_require__(4);
;// ./src/models/CountryAdmin.ts



const CountryAdmin = {
    resource: Country.Country,
    options: {
        titleProperty: 'name',
        properties: {
            id: { isVisible: false },
            name: {
                type: 'string',
                isSortable: true,
                custom: { isRequired: true }
            },
            hidden: {
                type: 'boolean',
                isSortable: true,
            },
        },
        actions: {
            show: { isAccessible: false },
            edit: { showInDrawer: true, before: validate },
            new: { before: validate },
            list: { before: elementsPerPage }
        },
        navigation: {
            // icon: 'EarthFilled'
            icon: 'Globe'
        }
    },
};

// EXTERNAL MODULE: ../shared/models/Partner.ts
var Partner = __webpack_require__(5);
;// ./src/models/PartnerAdmin.ts
// import {ResourceWithOptions} from "adminjs/types/src/adminjs-options.interface";








const PartnerAdmin = {
    resource: Partner.Partner,
    options: {
        titleProperty: 'name',
        properties: {
            id: { isVisible: false },
            name: {
                type: 'string',
                position: 10,
                isSortable: true,
                custom: { isRequired: true }
            },
            platformId: {
                position: 15,
                isSortable: true,
                custom: { isRequired: true }
            },
            hidden: {
                type: 'boolean',
                position: 17,
                isSortable: true,
            },
            website: {
                type: 'string',
                position: 20,
                isSortable: true,
                isVisible: { list: false, show: true, edit: true },
            },
            description: {
                type: 'richtext',
                position: 70,
                isVisible: { list: false, show: true, edit: true },
            },
            logo: {
                type: 'mixed',
                isVisible: true,
                position: 80,
                isSortable: false
            },
        },
        navigation: {
            // icon: 'Partnership'
            icon: 'Users'
        },
        sort: {
            sortBy: 'order',
            direction: 'asc',
        },
        actions: {
            show: { isAccessible: false },
            edit: { before: validate },
            new: { before: validate },
            list: { before: elementsPerPage }
        }
    },
    features: [
        (0,upload_namespaceObject["default"])({
            componentLoader: componentLoader,
            provider: new UploadLocalProvider({
                bucket: external_path_default().join(_dirname_dirname, '/assets/upload'),
                opts: { baseUrl: '/assets/upload' },
            }),
            properties: {
                file: `logo`,
                key: `logo.key`,
                mimeType: `logo.mime`,
                bucket: `logo.bucket`,
                size: `logo.size`,
                filename: 'logo.filename',
            },
            // multiple: true,
            validation: {
                // @TODO: make it work with svg
                mimeTypes: ['image/png', 'image/jpg', 'image/jpeg', /*'image/svg+xml'*/],
                maxSize: 10485760
            },
            uploadPath: (record, filename) => `logo/partner/${filename}`
        })
    ]
};

// EXTERNAL MODULE: external "tslib"
var external_tslib_ = __webpack_require__(2);
// EXTERNAL MODULE: external "typeorm"
var external_typeorm_ = __webpack_require__(3);
;// ../shared/models/Publication.ts


let Publication = class Publication extends external_typeorm_.BaseEntity {
    constructor(id, title, authors) {
        super();
        this.id = id;
        this.title = title;
        this.authors = authors;
    }
    id;
    title;
    authors;
    publisher;
    publicationDate;
    url;
};
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.PrimaryGeneratedColumn)(),
    (0,external_tslib_.__metadata)("design:type", Number)
], Publication.prototype, "id", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)(),
    (0,external_tslib_.__metadata)("design:type", String)
], Publication.prototype, "title", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)({ type: 'varchar', length: 200 }),
    (0,external_tslib_.__metadata)("design:type", String)
], Publication.prototype, "authors", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)(),
    (0,external_tslib_.__metadata)("design:type", String)
], Publication.prototype, "publisher", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)(),
    (0,external_tslib_.__metadata)("design:type", String)
], Publication.prototype, "publicationDate", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)({ nullable: true }),
    (0,external_tslib_.__metadata)("design:type", String)
], Publication.prototype, "url", void 0);
Publication = (0,external_tslib_.__decorate)([
    (0,external_typeorm_.Entity)({ name: 'publication' }),
    (0,external_tslib_.__metadata)("design:paramtypes", [Number, String, String])
], Publication);


;// ./src/models/PublicationAdmin.ts
// import {ResourceWithOptions} from "adminjs/types/src/adminjs-options.interface";



const PublicationAdmin = {
    resource: Publication,
    options: {
        titleProperty: 'title',
        properties: {
            id: { isVisible: false },
            title: {
                type: 'string',
                custom: { isRequired: true }
            },
            authors: {
                type: 'string',
                custom: { isRequired: true }
            },
            publisher: {
                type: 'string',
                custom: { isRequired: true }
            },
            publicationDate: {
                type: 'date',
                custom: { isRequired: true }
            },
            url: {
                type: 'string',
            },
        },
        actions: {
            show: { isAccessible: false },
            edit: { before: validate },
            new: { before: validate },
            list: { before: elementsPerPage }
        },
        sort: {
            sortBy: 'publicationDate',
            direction: 'desc',
        },
        navigation: {
            icon: 'Book'
        }
    },
};

;// ../shared/models/Tag.ts


let Tag = class Tag extends external_typeorm_.BaseEntity {
    constructor(id, label) {
        super();
        this.id = id;
        this.label = label;
    }
    id;
    label;
};
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.PrimaryGeneratedColumn)(),
    (0,external_tslib_.__metadata)("design:type", Number)
], Tag.prototype, "id", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)({ unique: true }),
    (0,external_tslib_.__metadata)("design:type", String)
], Tag.prototype, "label", void 0);
Tag = (0,external_tslib_.__decorate)([
    (0,external_typeorm_.Entity)({ name: 'tag' }),
    (0,external_tslib_.__metadata)("design:paramtypes", [Number, String])
], Tag);


;// ../shared/models/News.ts
var _a;



let News = class News extends external_typeorm_.BaseEntity {
    constructor(id, title, content) {
        super();
        this.id = id;
        this.title = title;
        this.content = content;
    }
    id;
    title;
    content;
    publicationDate;
    tag;
    tagId;
};
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.PrimaryGeneratedColumn)(),
    (0,external_tslib_.__metadata)("design:type", Number)
], News.prototype, "id", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)(),
    (0,external_tslib_.__metadata)("design:type", String)
], News.prototype, "title", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)({ type: 'longtext' }),
    (0,external_tslib_.__metadata)("design:type", String)
], News.prototype, "content", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.Column)({ default: '(current_date)' }),
    (0,external_tslib_.__metadata)("design:type", String)
], News.prototype, "publicationDate", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.ManyToOne)('tag', 'news'),
    (0,external_tslib_.__metadata)("design:type", typeof (_a = typeof Tag !== "undefined" && Tag) === "function" ? _a : Object)
], News.prototype, "tag", void 0);
(0,external_tslib_.__decorate)([
    (0,external_typeorm_.RelationId)((news) => news.tag),
    (0,external_typeorm_.Column)(),
    (0,external_tslib_.__metadata)("design:type", Number)
], News.prototype, "tagId", void 0);
News = (0,external_tslib_.__decorate)([
    (0,external_typeorm_.Entity)({ name: 'news' }),
    (0,external_tslib_.__metadata)("design:paramtypes", [Number, String, String])
], News);


;// ./src/models/NewsAdmin.ts



const NewsAdmin = {
    resource: News,
    options: {
        titleProperty: 'title',
        properties: {
            id: { isVisible: false },
            title: {
                type: 'string',
                position: 10,
                props: {
                    maxLength: 100,
                },
                isSortable: true,
                custom: { isRequired: true }
            },
            publicationDate: {
                type: 'date',
                position: 20,
                isSortable: true
            },
            tagId: {
                position: 30,
                isSortable: true
            },
            content: {
                type: 'richtext',
                isVisible: { list: false, show: true, edit: true },
                position: 40,
                isSortable: true,
                custom: { isRequired: true }
            },
        },
        actions: {
            show: { isAccessible: false },
            edit: { before: validate },
            new: { before: validate },
            list: { before: elementsPerPage }
        },
        sort: {
            sortBy: 'publicationDate',
            direction: 'desc',
        },
        navigation: {
            icon: 'Send'
        }
    },
};

;// ./src/models/TagAdmin.ts



const TagAdmin = {
    resource: Tag,
    options: {
        titleProperty: 'label',
        properties: {
            id: { isVisible: false },
            label: {
                type: 'string',
                custom: { isRequired: true }
            }
        },
        actions: {
            show: { isAccessible: false },
            edit: { showInDrawer: true, before: validate },
            new: { before: validate },
            list: {
                before: elementsPerPage
            }
        },
        sort: {
            sortBy: 'label',
            direction: 'desc',
        },
        navigation: {
            icon: 'Tag'
        }
    },
};

;// ./src/i18n/en.ts
const en = {
    labels: {},
    resources: {
        Platform: {
            properties: {
                countryId: 'Country'
            }
        },
        News: {
            properties: {
                tagId: 'Tag'
            }
        },
        Partner: {
            properties: {
                platformId: 'Platform',
                description: 'Role'
            }
        }
    },
    components: {
        Login: {
            welcomeHeader: "Admin Panel",
            welcomeMessage: "Welcome to influenzanet admin panel. Please login to continue",
            properties: {
                "email": "Email",
                "password": "Password"
            },
            loginButton: "Login"
        }
    }
};

;// ./src/themes/influenzaNet.ts
const colorMain = '#003556';
// const colorAccent = '#00AB9F';
// const colorAccent = '#008a80';
// const colorAccent = '#008a89';
const colorAccent = '#00898a';
const colorBase = '#404040';
const colorBaseLight = '#FCFCFC';
const colorBaseAccent = '#F0F3F6';
const colorBaseAccentDark = '#979d9d';
const influenzaNet = {
    id: 'InfluenzaNet',
    name: 'InfluenzaNet',
    overrides: {
        colors: {
            primary100: colorAccent,
            bg: colorBaseAccent,
            accent: colorMain,
            // text: colorBase,
        },
    }
};

;// ./src/config/admin.ts









const adminConfiguration = {
    rootPath: '/admin',
    loginPath: '/admin/login',
    componentLoader: componentLoader,
    dashboard: {
        component: 'Dashboard'
    },
    resources: [
        PlatformAdmin,
        CountryAdmin,
        PartnerAdmin,
        PublicationAdmin,
        NewsAdmin,
        TagAdmin
    ],
    locale: {
        language: 'en',
        availableLanguages: ['en'],
        fallbackLng: "en",
        translations: { en: en },
        debug: false
    },
    branding: {
        companyName: 'InfluenzaNet',
        logo: '/assets/img/logo/influenzaNet/influenzanet_logo.png',
        withMadeWithLove: false,
    },
    assets: {
        styles: ['/assets/css/admin.css'],
    },
    defaultTheme: influenzaNet.id,
    availableThemes: [influenzaNet],
};

;// ./src/config/database.ts






const databaseConfiguration = {
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    extra: {
        charset: "utf8mb4_unicode_ci",
    },
    entities: [
        Platform.Platform,
        Country.Country,
        Partner.Partner,
        Publication,
        News,
        Tag
    ],
    synchronize: false
};

;// ./src/config/authentication.ts
const authenticationOptions = {
    authenticate: async (email, password) => {
        const adminUser = process.env.ADMIN_USER;
        const adminPassword = process.env.ADMIN_PASSWORD;
        return email === adminUser && password === adminPassword
            ? Promise.resolve({ email: adminUser, password: adminPassword })
            : null;
    },
    cookieName: 'adminjs',
    cookiePassword: 'sessionsecret',
};

;// external "express-mysql-session"
const external_express_mysql_session_namespaceObject = __WEBPACK_EXTERNAL_MODULE_express_mysql_session_3dcff3af__;
;// external "express-session"
const external_express_session_namespaceObject = __WEBPACK_EXTERNAL_MODULE_express_session_d2460649__;
;// ./src/config/session.ts


const store = (0,external_express_mysql_session_namespaceObject["default"])(external_express_session_namespaceObject["default"]);
const sessionOptions = {
    store: new store({
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        createDatabaseTable: true
    }),
    saveUninitialized: true,
    secret: 'secret',
    resave: true
};

;// ./src/main.ts













// Vars
const PORT = 3000;
const ASSETS_URL = '/assets';
// Typeorm adapter
external_adminjs_namespaceObject["default"].registerAdapter({ Resource: typeorm_namespaceObject.Resource, Database: typeorm_namespaceObject.Database });
const start = async () => {
    // Express App
    const app = (0,external_express_namespaceObject["default"])();
    // Database
    const datasource = await (new external_typeorm_.DataSource(databaseConfiguration)).initialize();
    // AdminJS
    const admin = new external_adminjs_namespaceObject["default"](adminConfiguration);
    // Admin Router
    app.use(admin.options.rootPath, express_namespaceObject["default"].buildAuthenticatedRouter(admin, authenticationOptions, null, sessionOptions));
    // Serve Static files on development
    if (process.env.NODE_ENV === 'development') {
        logger.info(`Serving static files to http://localhost:${PORT}${ASSETS_URL}`);
        app.use('/assets', external_express_namespaceObject["default"]["static"](external_path_default().join(_dirname_dirname, ASSETS_URL)));
    }
    // Start server
    app.listen(PORT, () => { logger.log(`Started on http://localhost:${PORT}${admin.options.rootPath}`); });
};
start();

})();

