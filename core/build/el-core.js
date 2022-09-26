define(() => { return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/typedi/esm5/container-instance.class.js":
/*!**************************************************************!*\
  !*** ./node_modules/typedi/esm5/container-instance.class.js ***!
  \**************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./container.class */ "./node_modules/typedi/esm5/container.class.js"), __webpack_require__(/*! ./error/service-not-found.error */ "./node_modules/typedi/esm5/error/service-not-found.error.js"), __webpack_require__(/*! ./error/cannot-instantiate-value.error */ "./node_modules/typedi/esm5/error/cannot-instantiate-value.error.js"), __webpack_require__(/*! ./token.class */ "./node_modules/typedi/esm5/token.class.js"), __webpack_require__(/*! ./empty.const */ "./node_modules/typedi/esm5/empty.const.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_exports, _container, _serviceNotFound, _cannotInstantiateValue, _token, _empty) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  exports.ContainerInstance = void 0;

  var __assign = void 0 && (void 0).__assign || function () {
    __assign = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];

        for (var p in s) {
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
      }

      return t;
    };

    return __assign.apply(this, arguments);
  };

  var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
      s += arguments[i].length;
    }

    for (var r = Array(s), k = 0, i = 0; i < il; i++) {
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
        r[k] = a[j];
      }
    }

    return r;
  };

  /**
   * TypeDI can have multiple containers.
   * One container is ContainerInstance.
   */
  var ContainerInstance =
  /** @class */
  function () {
    function ContainerInstance(id) {
      /** All registered services in the container. */
      this.services = [];
      this.id = id;
    }

    ContainerInstance.prototype.has = function (identifier) {
      return !!this.findService(identifier);
    };

    ContainerInstance.prototype.get = function (identifier) {
      var globalContainer = _container.Container.of(undefined);

      var globalService = globalContainer.findService(identifier);
      var scopedService = this.findService(identifier);
      if (globalService && globalService.global === true) return this.getServiceValue(globalService);
      if (scopedService) return this.getServiceValue(scopedService);
      /** If it's the first time requested in the child container we load it from parent and set it. */

      if (globalService && this !== globalContainer) {
        var clonedService = __assign({}, globalService);

        clonedService.value = _empty.EMPTY_VALUE;
        /**
         * We need to immediately set the empty value from the root container
         * to prevent infinite lookup in cyclic dependencies.
         */

        this.set(clonedService);
        var value = this.getServiceValue(clonedService);
        this.set(__assign(__assign({}, clonedService), {
          value: value
        }));
        return value;
      }

      if (globalService) return this.getServiceValue(globalService);
      throw new _serviceNotFound.ServiceNotFoundError(identifier);
    };

    ContainerInstance.prototype.getMany = function (identifier) {
      var _this = this;

      return this.findAllServices(identifier).map(function (service) {
        return _this.getServiceValue(service);
      });
    };

    ContainerInstance.prototype.set = function (identifierOrServiceMetadata, value) {
      var _this = this;

      if (identifierOrServiceMetadata instanceof Array) {
        identifierOrServiceMetadata.forEach(function (data) {
          return _this.set(data);
        });
        return this;
      }

      if (typeof identifierOrServiceMetadata === 'string' || identifierOrServiceMetadata instanceof _token.Token) {
        return this.set({
          id: identifierOrServiceMetadata,
          type: null,
          value: value,
          factory: undefined,
          global: false,
          multiple: false,
          eager: false,
          "transient": false
        });
      }

      if (typeof identifierOrServiceMetadata === 'function') {
        return this.set({
          id: identifierOrServiceMetadata,
          // TODO: remove explicit casting
          type: identifierOrServiceMetadata,
          value: value,
          factory: undefined,
          global: false,
          multiple: false,
          eager: false,
          "transient": false
        });
      }

      var newService = __assign({
        id: new _token.Token('UNREACHABLE'),
        type: null,
        factory: undefined,
        value: _empty.EMPTY_VALUE,
        global: false,
        multiple: false,
        eager: false,
        "transient": false
      }, identifierOrServiceMetadata);

      var service = this.findService(newService.id);

      if (service && service.multiple !== true) {
        Object.assign(service, newService);
      } else {
        this.services.push(newService);
      }

      if (newService.eager) {
        this.get(newService.id);
      }

      return this;
    };
    /**
     * Removes services with a given service identifiers.
     */


    ContainerInstance.prototype.remove = function (identifierOrIdentifierArray) {
      var _this = this;

      if (Array.isArray(identifierOrIdentifierArray)) {
        identifierOrIdentifierArray.forEach(function (id) {
          return _this.remove(id);
        });
      } else {
        this.services = this.services.filter(function (service) {
          if (service.id === identifierOrIdentifierArray) {
            _this.destroyServiceInstance(service);

            return false;
          }

          return true;
        });
      }

      return this;
    };
    /**
     * Completely resets the container by removing all previously registered services from it.
     */


    ContainerInstance.prototype.reset = function (options) {
      var _this = this;

      if (options === void 0) {
        options = {
          strategy: 'resetValue'
        };
      }

      switch (options.strategy) {
        case 'resetValue':
          this.services.forEach(function (service) {
            return _this.destroyServiceInstance(service);
          });
          break;

        case 'resetServices':
          this.services.forEach(function (service) {
            return _this.destroyServiceInstance(service);
          });
          this.services = [];
          break;

        default:
          throw new Error('Received invalid reset strategy.');
      }

      return this;
    };
    /**
     * Returns all services registered with the given identifier.
     */


    ContainerInstance.prototype.findAllServices = function (identifier) {
      return this.services.filter(function (service) {
        return service.id === identifier;
      });
    };
    /**
     * Finds registered service in the with a given service identifier.
     */


    ContainerInstance.prototype.findService = function (identifier) {
      return this.services.find(function (service) {
        return service.id === identifier;
      });
    };
    /**
     * Gets the value belonging to `serviceMetadata.id`.
     *
     * - if `serviceMetadata.value` is already set it is immediately returned
     * - otherwise the requested type is resolved to the value saved to `serviceMetadata.value` and returned
     */


    ContainerInstance.prototype.getServiceValue = function (serviceMetadata) {
      var _a;

      var value = _empty.EMPTY_VALUE;
      /**
       * If the service value has been set to anything prior to this call we return that value.
       * NOTE: This part builds on the assumption that transient dependencies has no value set ever.
       */

      if (serviceMetadata.value !== _empty.EMPTY_VALUE) {
        return serviceMetadata.value;
      }
      /** If both factory and type is missing, we cannot resolve the requested ID. */


      if (!serviceMetadata.factory && !serviceMetadata.type) {
        throw new _cannotInstantiateValue.CannotInstantiateValueError(serviceMetadata.id);
      }
      /**
       * If a factory is defined it takes priority over creating an instance via `new`.
       * The return value of the factory is not checked, we believe by design that the user knows what he/she is doing.
       */


      if (serviceMetadata.factory) {
        /**
         * If we received the factory in the [Constructable<Factory>, "functionName"] format, we need to create the
         * factory first and then call the specified function on it.
         */
        if (serviceMetadata.factory instanceof Array) {
          var factoryInstance = void 0;

          try {
            /** Try to get the factory from TypeDI first, if failed, fall back to simply initiating the class. */
            factoryInstance = this.get(serviceMetadata.factory[0]);
          } catch (error) {
            if (error instanceof _serviceNotFound.ServiceNotFoundError) {
              factoryInstance = new serviceMetadata.factory[0]();
            } else {
              throw error;
            }
          }

          value = factoryInstance[serviceMetadata.factory[1]](this, serviceMetadata.id);
        } else {
          /** If only a simple function was provided we simply call it. */
          value = serviceMetadata.factory(this, serviceMetadata.id);
        }
      }
      /**
       * If no factory was provided and only then, we create the instance from the type if it was set.
       */


      if (!serviceMetadata.factory && serviceMetadata.type) {
        var constructableTargetType = serviceMetadata.type; // setup constructor parameters for a newly initialized service

        var paramTypes = ((_a = Reflect) === null || _a === void 0 ? void 0 : _a.getMetadata('design:paramtypes', constructableTargetType)) || [];
        var params = this.initializeParams(constructableTargetType, paramTypes); // "extra feature" - always pass container instance as the last argument to the service function
        // this allows us to support javascript where we don't have decorators and emitted metadata about dependencies
        // need to be injected, and user can use provided container to get instances he needs

        params.push(this);
        value = new (constructableTargetType.bind.apply(constructableTargetType, __spreadArrays([void 0], params)))(); // TODO: Calling this here, leads to infinite loop, because @Inject decorator registerds a handler
        // TODO: which calls Container.get, which will check if the requested type has a value set and if not
        // TODO: it will start the instantiation process over. So this is currently called outside of the if branch
        // TODO: after the current value has been assigned to the serviceMetadata.
        // this.applyPropertyHandlers(constructableTargetType, value as Constructable<unknown>);
      }
      /** If this is not a transient service, and we resolved something, then we set it as the value. */


      if (!serviceMetadata["transient"] && value !== _empty.EMPTY_VALUE) {
        serviceMetadata.value = value;
      }

      if (value === _empty.EMPTY_VALUE) {
        /** This branch should never execute, but better to be safe than sorry. */
        throw new _cannotInstantiateValue.CannotInstantiateValueError(serviceMetadata.id);
      }

      if (serviceMetadata.type) {
        this.applyPropertyHandlers(serviceMetadata.type, value);
      }

      return value;
    };
    /**
     * Initializes all parameter types for a given target service class.
     */


    ContainerInstance.prototype.initializeParams = function (target, paramTypes) {
      var _this = this;

      return paramTypes.map(function (paramType, index) {
        var paramHandler = _container.Container.handlers.find(function (handler) {
          /**
           * @Inject()-ed values are stored as parameter handlers and they reference their target
           * when created. So when a class is extended the @Inject()-ed values are not inherited
           * because the handler still points to the old object only.
           *
           * As a quick fix a single level parent lookup is added via `Object.getPrototypeOf(target)`,
           * however this should be updated to a more robust solution.
           *
           * TODO: Add proper inheritance handling: either copy the handlers when a class is registered what
           * TODO: has it's parent already registered as dependency or make the lookup search up to the base Object.
           */
          return (handler.object === target || handler.object === Object.getPrototypeOf(target)) && handler.index === index;
        });

        if (paramHandler) return paramHandler.value(_this);

        if (paramType && paramType.name && !_this.isPrimitiveParamType(paramType.name)) {
          return _this.get(paramType);
        }

        return undefined;
      });
    };
    /**
     * Checks if given parameter type is primitive type or not.
     */


    ContainerInstance.prototype.isPrimitiveParamType = function (paramTypeName) {
      return ['string', 'boolean', 'number', 'object'].includes(paramTypeName.toLowerCase());
    };
    /**
     * Applies all registered handlers on a given target class.
     */


    ContainerInstance.prototype.applyPropertyHandlers = function (target, instance) {
      var _this = this;

      _container.Container.handlers.forEach(function (handler) {
        if (typeof handler.index === 'number') return;
        if (handler.object.constructor !== target && !(target.prototype instanceof handler.object.constructor)) return;

        if (handler.propertyName) {
          instance[handler.propertyName] = handler.value(_this);
        }
      });
    };
    /**
     * Checks if the given service metadata contains a destroyable service instance and destroys it in place. If the service
     * contains a callable function named `destroy` it is called but not awaited and the return value is ignored..
     *
     * @param serviceMetadata the service metadata containing the instance to destroy
     * @param force when true the service will be always destroyed even if it's cannot be re-created
     */


    ContainerInstance.prototype.destroyServiceInstance = function (serviceMetadata, force) {
      if (force === void 0) {
        force = false;
      }
      /** We reset value only if we can re-create it (aka type or factory exists). */


      var shouldResetValue = force || !!serviceMetadata.type || !!serviceMetadata.factory;

      if (shouldResetValue) {
        /** If we wound a function named destroy we call it without any params. */
        if (typeof (serviceMetadata === null || serviceMetadata === void 0 ? void 0 : serviceMetadata.value)['destroy'] === 'function') {
          try {
            serviceMetadata.value.destroy();
          } catch (error) {
            /** We simply ignore the errors from the destroy function. */
          }
        }

        serviceMetadata.value = _empty.EMPTY_VALUE;
      }
    };

    return ContainerInstance;
  }();

  exports.ContainerInstance = ContainerInstance;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./node_modules/typedi/esm5/container.class.js":
/*!*****************************************************!*\
  !*** ./node_modules/typedi/esm5/container.class.js ***!
  \*****************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./container-instance.class */ "./node_modules/typedi/esm5/container-instance.class.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_exports, _containerInstance) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  exports.Container = void 0;

  /**
   * Service container.
   */
  var Container =
  /** @class */
  function () {
    function Container() {}
    /**
     * Gets a separate container instance for the given instance id.
     */


    Container.of = function (containerId) {
      if (containerId === void 0) {
        containerId = 'default';
      }

      if (containerId === 'default') return this.globalInstance;
      var container = this.instances.find(function (instance) {
        return instance.id === containerId;
      });

      if (!container) {
        container = new _containerInstance.ContainerInstance(containerId);
        this.instances.push(container); // TODO: Why we are not reseting here? Let's reset here. (I have added the commented code.)
        // container.reset();
      }

      return container;
    };

    Container.has = function (identifier) {
      return this.globalInstance.has(identifier);
    };

    Container.get = function (identifier) {
      return this.globalInstance.get(identifier);
    };

    Container.getMany = function (id) {
      return this.globalInstance.getMany(id);
    };

    Container.set = function (identifierOrServiceMetadata, value) {
      this.globalInstance.set(identifierOrServiceMetadata, value);
      return this;
    };
    /**
     * Removes services with a given service identifiers.
     */


    Container.remove = function (identifierOrIdentifierArray) {
      this.globalInstance.remove(identifierOrIdentifierArray);
      return this;
    };
    /**
     * Completely resets the container by removing all previously registered services and handlers from it.
     */


    Container.reset = function (containerId) {
      if (containerId === void 0) {
        containerId = 'default';
      }

      if (containerId == 'default') {
        this.globalInstance.reset();
        this.instances.forEach(function (instance) {
          return instance.reset();
        });
      } else {
        var instance = this.instances.find(function (instance) {
          return instance.id === containerId;
        });

        if (instance) {
          instance.reset();
          this.instances.splice(this.instances.indexOf(instance), 1);
        }
      }

      return this;
    };
    /**
     * Registers a new handler.
     */


    Container.registerHandler = function (handler) {
      this.handlers.push(handler);
      return this;
    };
    /**
     * Helper method that imports given services.
     */

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */


    Container["import"] = function (services) {
      return this;
    };
    /**
     * All registered handlers. The @Inject() decorator uses handlers internally to mark a property for injection.
     **/


    Container.handlers = [];
    /**  Global container instance. */

    Container.globalInstance = new _containerInstance.ContainerInstance('default');
    /** Other containers created using Container.of method. */

    Container.instances = [];
    return Container;
  }();

  exports.Container = Container;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./node_modules/typedi/esm5/decorators/inject-many.decorator.js":
/*!**********************************************************************!*\
  !*** ./node_modules/typedi/esm5/decorators/inject-many.decorator.js ***!
  \**********************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ../container.class */ "./node_modules/typedi/esm5/container.class.js"), __webpack_require__(/*! ../error/cannot-inject-value.error */ "./node_modules/typedi/esm5/error/cannot-inject-value.error.js"), __webpack_require__(/*! ../utils/resolve-to-type-wrapper.util */ "./node_modules/typedi/esm5/utils/resolve-to-type-wrapper.util.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_exports, _container, _cannotInjectValue, _resolveToTypeWrapper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  exports.InjectMany = InjectMany;

  function InjectMany(typeOrIdentifier) {
    return function (target, propertyName, index) {
      var typeWrapper = (0, _resolveToTypeWrapper.resolveToTypeWrapper)(typeOrIdentifier, target, propertyName, index);
      /** If no type was inferred, or the general Object type was inferred we throw an error. */

      if (typeWrapper === undefined || typeWrapper.eagerType === undefined || typeWrapper.eagerType === Object) {
        throw new _cannotInjectValue.CannotInjectValueError(target, propertyName);
      }

      _container.Container.registerHandler({
        object: target,
        propertyName: propertyName,
        index: index,
        value: function value(containerInstance) {
          var evaluatedLazyType = typeWrapper.lazyType();
          /** If no type was inferred lazily, or the general Object type was inferred we throw an error. */

          if (evaluatedLazyType === undefined || evaluatedLazyType === Object) {
            throw new _cannotInjectValue.CannotInjectValueError(target, propertyName);
          }

          return containerInstance.getMany(evaluatedLazyType);
        }
      });
    };
  }
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./node_modules/typedi/esm5/decorators/inject.decorator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/typedi/esm5/decorators/inject.decorator.js ***!
  \*****************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ../container.class */ "./node_modules/typedi/esm5/container.class.js"), __webpack_require__(/*! ../error/cannot-inject-value.error */ "./node_modules/typedi/esm5/error/cannot-inject-value.error.js"), __webpack_require__(/*! ../utils/resolve-to-type-wrapper.util */ "./node_modules/typedi/esm5/utils/resolve-to-type-wrapper.util.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_exports, _container, _cannotInjectValue, _resolveToTypeWrapper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  exports.Inject = Inject;

  function Inject(typeOrIdentifier) {
    return function (target, propertyName, index) {
      var typeWrapper = (0, _resolveToTypeWrapper.resolveToTypeWrapper)(typeOrIdentifier, target, propertyName, index);
      /** If no type was inferred, or the general Object type was inferred we throw an error. */

      if (typeWrapper === undefined || typeWrapper.eagerType === undefined || typeWrapper.eagerType === Object) {
        throw new _cannotInjectValue.CannotInjectValueError(target, propertyName);
      }

      _container.Container.registerHandler({
        object: target,
        propertyName: propertyName,
        index: index,
        value: function value(containerInstance) {
          var evaluatedLazyType = typeWrapper.lazyType();
          /** If no type was inferred lazily, or the general Object type was inferred we throw an error. */

          if (evaluatedLazyType === undefined || evaluatedLazyType === Object) {
            throw new _cannotInjectValue.CannotInjectValueError(target, propertyName);
          }

          return containerInstance.get(evaluatedLazyType);
        }
      });
    };
  }
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./node_modules/typedi/esm5/decorators/service.decorator.js":
/*!******************************************************************!*\
  !*** ./node_modules/typedi/esm5/decorators/service.decorator.js ***!
  \******************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ../container.class */ "./node_modules/typedi/esm5/container.class.js"), __webpack_require__(/*! ../token.class */ "./node_modules/typedi/esm5/token.class.js"), __webpack_require__(/*! ../empty.const */ "./node_modules/typedi/esm5/empty.const.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_exports, _container, _token, _empty) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  exports.Service = Service;

  function Service(optionsOrServiceIdentifier) {
    return function (targetConstructor) {
      var serviceMetadata = {
        id: targetConstructor,
        // TODO: Let's investigate why we receive Function type instead of a constructable.
        type: targetConstructor,
        factory: undefined,
        multiple: false,
        global: false,
        eager: false,
        "transient": false,
        value: _empty.EMPTY_VALUE
      };

      if (optionsOrServiceIdentifier instanceof _token.Token || typeof optionsOrServiceIdentifier === 'string') {
        /** We received a Token or string ID. */
        serviceMetadata.id = optionsOrServiceIdentifier;
      } else if (optionsOrServiceIdentifier) {
        /** We received a ServiceOptions object. */
        serviceMetadata.id = optionsOrServiceIdentifier.id || targetConstructor;
        serviceMetadata.factory = optionsOrServiceIdentifier.factory || undefined;
        serviceMetadata.multiple = optionsOrServiceIdentifier.multiple || false;
        serviceMetadata.global = optionsOrServiceIdentifier.global || false;
        serviceMetadata.eager = optionsOrServiceIdentifier.eager || false;
        serviceMetadata["transient"] = optionsOrServiceIdentifier["transient"] || false;
      }

      _container.Container.set(serviceMetadata);
    };
  }
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./node_modules/typedi/esm5/empty.const.js":
/*!*************************************************!*\
  !*** ./node_modules/typedi/esm5/empty.const.js ***!
  \*************************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  exports.EMPTY_VALUE = void 0;
  var EMPTY_VALUE = Symbol('EMPTY_VALUE');
  exports.EMPTY_VALUE = EMPTY_VALUE;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./node_modules/typedi/esm5/error/cannot-inject-value.error.js":
/*!*********************************************************************!*\
  !*** ./node_modules/typedi/esm5/error/cannot-inject-value.error.js ***!
  \*********************************************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  exports.CannotInjectValueError = void 0;

  var __extends = void 0 && (void 0).__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    return function (d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  /**
   * Thrown when DI cannot inject value into property decorated by @Inject decorator.
   */


  var CannotInjectValueError =
  /** @class */
  function (_super) {
    __extends(CannotInjectValueError, _super);

    function CannotInjectValueError(target, propertyName) {
      var _this = _super.call(this) || this;

      _this.target = target;
      _this.propertyName = propertyName;
      _this.name = 'CannotInjectValueError';
      return _this;
    }

    Object.defineProperty(CannotInjectValueError.prototype, "message", {
      get: function get() {
        return "Cannot inject value into \"" + this.target.constructor.name + "." + this.propertyName + "\". " + "Please make sure you setup reflect-metadata properly and you don't use interfaces without service tokens as injection value.";
      },
      enumerable: false,
      configurable: true
    });
    return CannotInjectValueError;
  }(Error);

  exports.CannotInjectValueError = CannotInjectValueError;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./node_modules/typedi/esm5/error/cannot-instantiate-value.error.js":
/*!**************************************************************************!*\
  !*** ./node_modules/typedi/esm5/error/cannot-instantiate-value.error.js ***!
  \**************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ../token.class */ "./node_modules/typedi/esm5/token.class.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_exports, _token) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  exports.CannotInstantiateValueError = void 0;

  var __extends = void 0 && (void 0).__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    return function (d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();

  /**
   * Thrown when DI cannot inject value into property decorated by @Inject decorator.
   */
  var CannotInstantiateValueError =
  /** @class */
  function (_super) {
    __extends(CannotInstantiateValueError, _super);

    function CannotInstantiateValueError(identifier) {
      var _a, _b;

      var _this = _super.call(this) || this;

      _this.name = 'CannotInstantiateValueError';
      /** Normalized identifier name used in the error message. */

      _this.normalizedIdentifier = '<UNKNOWN_IDENTIFIER>'; // TODO: Extract this to a helper function and share between this and NotFoundError.

      if (typeof identifier === 'string') {
        _this.normalizedIdentifier = identifier;
      } else if (identifier instanceof _token.Token) {
        _this.normalizedIdentifier = "Token<" + (identifier.name || 'UNSET_NAME') + ">";
      } else if (identifier && (identifier.name || ((_a = identifier.prototype) === null || _a === void 0 ? void 0 : _a.name))) {
        _this.normalizedIdentifier = "MaybeConstructable<" + identifier.name + ">" || 0;
      }

      return _this;
    }

    Object.defineProperty(CannotInstantiateValueError.prototype, "message", {
      get: function get() {
        return "Cannot instantiate the requested value for the \"" + this.normalizedIdentifier + "\" identifier. " + "The related metadata doesn't contain a factory or a type to instantiate.";
      },
      enumerable: false,
      configurable: true
    });
    return CannotInstantiateValueError;
  }(Error);

  exports.CannotInstantiateValueError = CannotInstantiateValueError;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./node_modules/typedi/esm5/error/service-not-found.error.js":
/*!*******************************************************************!*\
  !*** ./node_modules/typedi/esm5/error/service-not-found.error.js ***!
  \*******************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ../token.class */ "./node_modules/typedi/esm5/token.class.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_exports, _token) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  exports.ServiceNotFoundError = void 0;

  var __extends = void 0 && (void 0).__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
      _extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) {
          if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        }
      };

      return _extendStatics(d, b);
    };

    return function (d, b) {
      _extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();

  /**
   * Thrown when requested service was not found.
   */
  var ServiceNotFoundError =
  /** @class */
  function (_super) {
    __extends(ServiceNotFoundError, _super);

    function ServiceNotFoundError(identifier) {
      var _a, _b;

      var _this = _super.call(this) || this;

      _this.name = 'ServiceNotFoundError';
      /** Normalized identifier name used in the error message. */

      _this.normalizedIdentifier = '<UNKNOWN_IDENTIFIER>';

      if (typeof identifier === 'string') {
        _this.normalizedIdentifier = identifier;
      } else if (identifier instanceof _token.Token) {
        _this.normalizedIdentifier = "Token<" + (identifier.name || 'UNSET_NAME') + ">";
      } else if (identifier && (identifier.name || ((_a = identifier.prototype) === null || _a === void 0 ? void 0 : _a.name))) {
        _this.normalizedIdentifier = "MaybeConstructable<" + identifier.name + ">" || 0;
      }

      return _this;
    }

    Object.defineProperty(ServiceNotFoundError.prototype, "message", {
      get: function get() {
        return "Service with \"" + this.normalizedIdentifier + "\" identifier was not found in the container. " + "Register it before usage via explicitly calling the \"Container.set\" function or using the \"@Service()\" decorator.";
      },
      enumerable: false,
      configurable: true
    });
    return ServiceNotFoundError;
  }(Error);

  exports.ServiceNotFoundError = ServiceNotFoundError;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./node_modules/typedi/esm5/index.js":
/*!*******************************************!*\
  !*** ./node_modules/typedi/esm5/index.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ./container.class */ "./node_modules/typedi/esm5/container.class.js"), __webpack_require__(/*! ./decorators/inject-many.decorator */ "./node_modules/typedi/esm5/decorators/inject-many.decorator.js"), __webpack_require__(/*! ./decorators/inject.decorator */ "./node_modules/typedi/esm5/decorators/inject.decorator.js"), __webpack_require__(/*! ./decorators/service.decorator */ "./node_modules/typedi/esm5/decorators/service.decorator.js"), __webpack_require__(/*! ./error/cannot-inject-value.error */ "./node_modules/typedi/esm5/error/cannot-inject-value.error.js"), __webpack_require__(/*! ./error/cannot-instantiate-value.error */ "./node_modules/typedi/esm5/error/cannot-instantiate-value.error.js"), __webpack_require__(/*! ./error/service-not-found.error */ "./node_modules/typedi/esm5/error/service-not-found.error.js"), __webpack_require__(/*! ./container-instance.class */ "./node_modules/typedi/esm5/container-instance.class.js"), __webpack_require__(/*! ./token.class */ "./node_modules/typedi/esm5/token.class.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_exports, _container, _injectMany, _inject, _service, _cannotInjectValue, _cannotInstantiateValue, _serviceNotFound, _containerInstance, _token) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    Container: true,
    ContainerInstance: true,
    Token: true
  };
  Object.defineProperty(_exports, "Container", {
    enumerable: true,
    get: function get() {
      return _container.Container;
    }
  });
  Object.defineProperty(_exports, "ContainerInstance", {
    enumerable: true,
    get: function get() {
      return _containerInstance.ContainerInstance;
    }
  });
  Object.defineProperty(_exports, "Token", {
    enumerable: true,
    get: function get() {
      return _token.Token;
    }
  });
  exports["default"] = void 0;
  Object.keys(_injectMany).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in _exports && _exports[key] === _injectMany[key]) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _injectMany[key];
      }
    });
  });
  Object.keys(_inject).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in _exports && _exports[key] === _inject[key]) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _inject[key];
      }
    });
  });
  Object.keys(_service).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in _exports && _exports[key] === _service[key]) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _service[key];
      }
    });
  });
  Object.keys(_cannotInjectValue).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in _exports && _exports[key] === _cannotInjectValue[key]) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _cannotInjectValue[key];
      }
    });
  });
  Object.keys(_cannotInstantiateValue).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in _exports && _exports[key] === _cannotInstantiateValue[key]) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _cannotInstantiateValue[key];
      }
    });
  });
  Object.keys(_serviceNotFound).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in _exports && _exports[key] === _serviceNotFound[key]) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _serviceNotFound[key];
      }
    });
  });

  /**
   * We have a hard dependency on reflect-metadata package.
   * Without the dependency lookup wont work. So we should warn the users
   * when it's not loaded.
   */
  // if(!Reflect || !(Reflect as any).getMetadata) {
  //   throw new Error('Reflect.getMetadata is not a function. Please import the "reflect-metadata" package at the first line of your application.');
  // }
  var _default = _container.Container;
  exports["default"] = _default;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./node_modules/typedi/esm5/token.class.js":
/*!*************************************************!*\
  !*** ./node_modules/typedi/esm5/token.class.js ***!
  \*************************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  exports.Token = void 0;

  /**
   * Used to create unique typed service identifier.
   * Useful when service has only interface, but don't have a class.
   */
  var Token =
  /** @class */
  function () {
    /**
     * @param name Token name, optional and only used for debugging purposes.
     */
    function Token(name) {
      this.name = name;
    }

    return Token;
  }();

  exports.Token = Token;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./node_modules/typedi/esm5/utils/resolve-to-type-wrapper.util.js":
/*!************************************************************************!*\
  !*** ./node_modules/typedi/esm5/utils/resolve-to-type-wrapper.util.js ***!
  \************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! ../token.class */ "./node_modules/typedi/esm5/token.class.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_exports, _token) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  exports.resolveToTypeWrapper = resolveToTypeWrapper;

  /**
   * Helper function used in inject decorators to resolve the received identifier to
   * an eager type when possible or to a lazy type when cyclic dependencies are possibly involved.
   *
   * @param typeOrIdentifier a service identifier or a function returning a type acting as service identifier or nothing
   * @param target the class definition of the target of the decorator
   * @param propertyName the name of the property in case of a PropertyDecorator
   * @param index the index of the parameter in the constructor in case of ParameterDecorator
   */
  function resolveToTypeWrapper(typeOrIdentifier, target, propertyName, index) {
    /**
     * ? We want to error out as soon as possible when looking up services to inject, however
     * ? we cannot determine the type at decorator execution when cyclic dependencies are involved
     * ? because calling the received `() => MyType` function right away would cause a JS error:
     * ? "Cannot access 'MyType' before initialization", so we need to execute the function in the handler,
     * ? when the classes are already created. To overcome this, we use a wrapper:
     * ?  - the lazyType is executed in the handler so we never have a JS error
     * ?  - the eagerType is checked when decorator is running and an error is raised if an unknown type is encountered
     */
    var typeWrapper;
    /** If requested type is explicitly set via a string ID or token, we set it explicitly. */

    if (typeOrIdentifier && typeof typeOrIdentifier === 'string' || typeOrIdentifier instanceof _token.Token) {
      typeWrapper = {
        eagerType: typeOrIdentifier,
        lazyType: function lazyType() {
          return typeOrIdentifier;
        }
      };
    }
    /** If requested type is explicitly set via a () => MyClassType format, we set it explicitly. */


    if (typeOrIdentifier && typeof typeOrIdentifier === 'function') {
      /** We set eagerType to null, preventing the raising of the CannotInjectValueError in decorators.  */
      typeWrapper = {
        eagerType: null,
        lazyType: function lazyType() {
          return typeOrIdentifier();
        }
      };
    }
    /** If no explicit type is set and handler registered for a class property, we need to get the property type. */


    if (!typeOrIdentifier && propertyName) {
      var identifier_1 = Reflect.getMetadata('design:type', target, propertyName);
      typeWrapper = {
        eagerType: identifier_1,
        lazyType: function lazyType() {
          return identifier_1;
        }
      };
    }
    /** If no explicit type is set and handler registered for a constructor parameter, we need to get the parameter types. */


    if (!typeOrIdentifier && typeof index == 'number' && Number.isInteger(index)) {
      var paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyName);
      /** It's not guaranteed, that we find any types for the constructor. */

      var identifier_2 = paramTypes === null || paramTypes === void 0 ? void 0 : paramTypes[index];
      typeWrapper = {
        eagerType: identifier_2,
        lazyType: function lazyType() {
          return identifier_2;
        }
      };
    }

    return typeWrapper;
  }
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./node_modules/typescript-string-operations/dist/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/typescript-string-operations/dist/index.js ***!
  \*****************************************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  "use strict";

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  Object.defineProperty(exports, "__esModule", ({
    value: !0
  })), exports.StringBuilder = exports.String = exports.formatString = exports.joinString = exports.isNullOrWhiteSpace = exports.emptyString = void 0;
  var EOL = "\r\n";

  function isNullOrWhiteSpace(value) {
    return String.isNullOrWhiteSpace(value);
  }

  function joinString(delimiter) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return String.join.apply(String, [delimiter].concat(args));
  }

  function formatString(format) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return String.format.apply(String, [format].concat(args));
  }

  exports.emptyString = "", exports.isNullOrWhiteSpace = isNullOrWhiteSpace, exports.joinString = joinString, exports.formatString = formatString;

  var String = /*#__PURE__*/function () {
    function String() {
      _classCallCheck(this, String);
    }

    _createClass(String, null, [{
      key: "IsNullOrWhiteSpace",
      value: function IsNullOrWhiteSpace(value) {
        return String.isNullOrWhiteSpace(value);
      }
    }, {
      key: "Join",
      value: function Join(delimiter) {
        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        return String.join.apply(String, [delimiter].concat(args));
      }
    }, {
      key: "Format",
      value: function Format(format) {
        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        return String.format.apply(String, [format].concat(args));
      }
    }, {
      key: "isNullOrWhiteSpace",
      value: function isNullOrWhiteSpace(value) {
        try {
          return null == value || "undefined" == value ? !0 : value.toString().replace(/\s/g, "").length < 1;
        } catch (e) {
          return console.log(e), !1;
        }
      }
    }, {
      key: "join",
      value: function join(delimiter) {
        try {
          for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
            args[_key5 - 1] = arguments[_key5];
          }

          var firstArg = args[0];

          if (Array.isArray(firstArg) || firstArg instanceof Array) {
            var tempString = String.empty;

            for (var i = 0; i < firstArg.length; i++) {
              var current = firstArg[i];
              i < firstArg.length - 1 ? tempString += current + delimiter : tempString += current;
            }

            return tempString;
          }

          if ("object" == _typeof(firstArg)) {
            var _tempString = String.empty;
            var objectArg = firstArg,
                keys = Object.keys(firstArg);
            return keys.forEach(function (element) {
              _tempString += objectArg[element] + delimiter;
            }), _tempString = _tempString.slice(0, _tempString.length - delimiter.length);
          }

          var stringArray = args;
          return String.joinString.apply(String, [delimiter].concat(stringArray));
        } catch (e) {
          return console.log(e), String.empty;
        }
      }
    }, {
      key: "format",
      value: function format(_format) {
        try {
          for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
            args[_key6 - 1] = arguments[_key6];
          }

          return _format.match(String.regexNumber) ? String.formatString(String.regexNumber, _format, args) : _format.match(String.regexObject) ? String.formatString(String.regexObject, _format, args, !0) : _format;
        } catch (e) {
          return console.log(e), String.empty;
        }
      }
    }, {
      key: "formatString",
      value: function formatString(regex, format, args) {
        var parseByObject = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
        return format.replace(regex, function (match, x) {
          var s = match.split(":");
          1 < s.length && (x = s[0].replace("{", ""), match = s[1].replace("}", ""));
          var arg;
          return null == (arg = (parseByObject ? args[0] : args)[x]) || null == arg || match.match(/{\d+}/) || void 0 !== (arg = String.parsePattern(match, arg)) && null != arg ? arg : String.empty;
        });
      }
    }, {
      key: "parsePattern",
      value: function parsePattern(match, arg) {
        switch (match) {
          case "L":
            return arg = arg.toLocaleLowerCase();

          case "U":
            return arg = arg.toLocaleUpperCase();

          case "d":
            if ("string" == typeof arg) return String.getDisplayDateFromString(arg);
            if (arg instanceof Date) return String.format("{0:00}.{1:00}.{2:0000}", arg.getDate(), arg.getMonth(), arg.getFullYear());
            break;

          case "s":
            if ("string" == typeof arg) return String.getSortableDateFromString(arg);
            if (arg instanceof Date) return String.format("{0:0000}-{1:00}-{2:00}", arg.getFullYear(), arg.getMonth(), arg.getDate());
            break;

          case "n":
            {
              var replacedString = (arg = "string" != typeof arg ? arg.toString() : arg).replace(/,/g, ".");
              if (isNaN(parseFloat(replacedString)) || replacedString.length <= 3) break;
              var numberparts = replacedString.split(/\D+/g);
              var parts = numberparts;
              var integer = (parts = 1 < numberparts.length ? [String.joinString.apply(String, [""].concat(_toConsumableArray(numberparts.splice(0, numberparts.length - 1)))), numberparts[numberparts.length - 1]] : parts)[0];
              var mod = integer.length % 3,
                  output = 0 < mod ? integer.substring(0, mod) : String.empty,
                  mod = integer.substring(mod).match(/.{3}/g);
              return arg = output + "." + String.join(".", mod) + (1 < parts.length ? "," + parts[1] : "");
            }

          case "x":
            return this.decimalToHexString(arg);

          case "X":
            return this.decimalToHexString(arg, !0);
        }

        return "number" != typeof arg && isNaN(arg) || isNaN(+match) || String.isNullOrWhiteSpace(arg) ? arg : String.formatNumber(arg, match);
      }
    }, {
      key: "decimalToHexString",
      value: function decimalToHexString(value) {
        var upperCase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        var parsed = parseFloat(value),
            hexNumber = parsed.toString(16);
        return upperCase ? hexNumber.toLocaleUpperCase() : hexNumber;
      }
    }, {
      key: "getDisplayDateFromString",
      value: function getDisplayDateFromString(input) {
        var splitted = input.split("-");
        if (splitted.length <= 1) return input;
        var day = splitted[splitted.length - 1];
        input = splitted[splitted.length - 2], splitted = splitted[splitted.length - 3];
        return (day = (day = day.split("T")[0]).split(" ")[0]) + ".".concat(input, ".") + splitted;
      }
    }, {
      key: "getSortableDateFromString",
      value: function getSortableDateFromString(input) {
        var splitted = input.replace(",", "").split(".");
        if (splitted.length <= 1) return input;
        input = splitted[splitted.length - 1].split(" ");
        var time = String.empty,
            result = (1 < input.length && (time = input[input.length - 1]), splitted[splitted.length - 1].split(" ")[0] + "-".concat(splitted[splitted.length - 2], "-") + splitted[splitted.length - 3]);
        return !String.isNullOrWhiteSpace(time) && 1 < time.length ? result += "T" + time : result += "T00:00:00", result;
      }
    }, {
      key: "formatNumber",
      value: function formatNumber(input, formatTemplate) {
        var formatTemplate = formatTemplate.length,
            input = input.toString();
        return formatTemplate <= input.length ? input : (formatTemplate = formatTemplate - input.length, ++formatTemplate, new Array(formatTemplate).join("0") + input);
      }
    }, {
      key: "joinString",
      value: function joinString(delimiter) {
        var temp = String.empty;

        for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
          args[_key7 - 1] = arguments[_key7];
        }

        for (var i = 0; i < args.length; i++) {
          if (!("string" == typeof args[i] && String.isNullOrWhiteSpace(args[i]) || "number" != typeof args[i] && "string" != typeof args[i])) {
            var arg = "" + args[i];
            temp += arg;

            for (var i2 = i + 1; i2 < args.length; i2++) {
              if (!String.isNullOrWhiteSpace(args[i2])) {
                temp += delimiter, i = i2 - 1;
                break;
              }
            }
          }
        }

        return temp;
      }
    }]);

    return String;
  }();

  _defineProperty(String, "regexNumber", /{(\d+(:\w*)?)}/g);

  _defineProperty(String, "regexObject", /{(\w+(:\w*)?)}/g);

  _defineProperty(String, "empty", "");

  _defineProperty(String, "Empty", "");

  exports.String = String;

  var StringBuilder = /*#__PURE__*/function () {
    function StringBuilder() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

      _classCallCheck(this, StringBuilder);

      _defineProperty(this, "Values", void 0);

      this.Values = [], String.isNullOrWhiteSpace(value) || (this.Values = new Array(value));
    }

    _createClass(StringBuilder, [{
      key: "toString",
      value: function toString() {
        return this.Values.join(String.empty);
      }
    }, {
      key: "ToString",
      value: function ToString() {
        return this.toString();
      }
    }, {
      key: "append",
      value: function append(value) {
        this.Values.push(value);
      }
    }, {
      key: "Append",
      value: function Append(value) {
        this.append(value);
      }
    }, {
      key: "appendLine",
      value: function appendLine(value) {
        this.Values.push(EOL + value);
      }
    }, {
      key: "AppendLine",
      value: function AppendLine(value) {
        this.appendLine(value);
      }
    }, {
      key: "appendFormat",
      value: function appendFormat(format) {
        for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
          args[_key8 - 1] = arguments[_key8];
        }

        this.Values.push(String.format.apply(String, [format].concat(args)));
      }
    }, {
      key: "AppendFormat",
      value: function AppendFormat(format) {
        for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
          args[_key9 - 1] = arguments[_key9];
        }

        this.appendFormat.apply(this, [format].concat(args));
      }
    }, {
      key: "appendLineFormat",
      value: function appendLineFormat(format) {
        for (var _len10 = arguments.length, args = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
          args[_key10 - 1] = arguments[_key10];
        }

        this.Values.push(EOL + String.format.apply(String, [format].concat(args)));
      }
    }, {
      key: "AppendLineFormat",
      value: function AppendLineFormat(format) {
        for (var _len11 = arguments.length, args = new Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
          args[_key11 - 1] = arguments[_key11];
        }

        return this.appendLineFormat.apply(this, [format].concat(args));
      }
    }, {
      key: "clear",
      value: function clear() {
        this.Values = [];
      }
    }, {
      key: "Clear",
      value: function Clear() {
        this.clear();
      }
    }]);

    return StringBuilder;
  }();

  exports.StringBuilder = StringBuilder;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./db/esq.ts":
/*!*******************!*\
  !*** ./db/esq.ts ***!
  \*******************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteQuery = exports.UpdateQuery = exports.InsertQuery = exports.EntitySchemaQuery = void 0;
class BaseQuery {
    constructor(config) {
        this.config = config;
    }
    query() {
        return new Promise(resolve => this.tQuery.execute(resolve, this));
    }
}
class FilterableQuery extends BaseQuery {
    get filters() {
        return this.tQuery.filters;
    }
    set filters(filters) {
        this.tQuery.filters = filters;
    }
    constructor(config) {
        super(config);
    }
}
class EntitySchemaQuery extends FilterableQuery {
    get isPageable() {
        return this.tQuery.isPageable;
    }
    set isPageable(value) {
        this.tQuery.isPageable = value;
    }
    get useRecordDeactivation() {
        return this.tQuery.useRecordDeactivation;
    }
    set useRecordDeactivation(value) {
        this.tQuery.useRecordDeactivation = value;
    }
    get rowsOffset() {
        return this.tQuery.rowsOffset;
    }
    set rowsOffset(value) {
        this.tQuery.rowsOffset = value;
    }
    get allColumns() {
        return this.tQuery.allColumns;
    }
    set allColumns(value) {
        this.tQuery.allColumns = value;
    }
    get rowCount() {
        return this.tQuery.rowCount;
    }
    set rowCount(value) {
        this.tQuery.rowCount = value;
    }
    get clientESQCacheParameters() {
        return this.tQuery.clientESQCacheParameters;
    }
    set clientESQCacheParameters(value) {
        this.tQuery.clientESQCacheParameters = value;
    }
    constructor(config) {
        super(config);
        this.tQuery = window.Ext.create('Terrasoft.EntitySchemaQuery', config);
    }
    enablePrimaryColumnFilter(id) {
        this.tQuery.enablePrimaryColumnFilter(id);
    }
    addColumn(column, alias) {
        return this.tQuery.addColumn(column, alias);
    }
    addColumns(columns) {
        this.tQuery.addColumns(columns);
    }
    addAggregationSchemaColumn(column, type, alias) {
        this.tQuery.addAggregationSchemaColumn(column, type, alias);
    }
    queryFirst() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.rowCount = 1;
            const result = yield this.query();
            return (_a = result.collection) === null || _a === void 0 ? void 0 : _a.first();
        });
    }
}
exports.EntitySchemaQuery = EntitySchemaQuery;
class InsertQuery extends BaseQuery {
    constructor(config) {
        super(config);
        this.tQuery = window.Ext.create('Terrasoft.InsertQuery', config);
    }
    setParameterValue(column, value, valueType) {
        this.tQuery.setParameterValue(column, value, valueType);
    }
}
exports.InsertQuery = InsertQuery;
class UpdateQuery extends FilterableQuery {
    constructor(config) {
        super(config);
        this.tQuery = window.Ext.create('Terrasoft.UpdateQuery', config);
    }
    setParameterValue(column, value, valueType) {
        this.tQuery.setParameterValue(column, value, valueType);
    }
}
exports.UpdateQuery = UpdateQuery;
class DeleteQuery extends FilterableQuery {
    constructor(config) {
        super(config);
        this.tQuery = window.Ext.create('Terrasoft.DeleteQuery', config);
    }
}
exports.DeleteQuery = DeleteQuery;


/***/ }),

/***/ "./db/types/filters.ts":
/*!*****************************!*\
  !*** ./db/types/filters.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createIsNotNullFilter = exports.createIsNullFilter = exports.createNotExistsFilter = exports.createExistsFilter = exports.createEndsWithFilter = exports.createStartsWithFilter = exports.createContainsFilter = exports.createLessOrEqualsFilter = exports.createLessFilter = exports.createGreaterOrEqualsFilter = exports.createGreaterFilter = exports.createNotInFilter = exports.createInFilter = exports.createNotEqualsFilter = exports.createEqualsFilter = exports.createFilterGroup = exports.AggregationType = exports.FilterType = exports.ComparisonType = exports.LogicalOperator = void 0;
var LogicalOperator;
(function (LogicalOperator) {
    LogicalOperator[LogicalOperator["AND"] = 0] = "AND";
    LogicalOperator[LogicalOperator["OR"] = 1] = "OR";
})(LogicalOperator = exports.LogicalOperator || (exports.LogicalOperator = {}));
var ComparisonType;
(function (ComparisonType) {
    ComparisonType[ComparisonType["BETWEEN"] = 0] = "BETWEEN";
    ComparisonType[ComparisonType["IS_NULL"] = 1] = "IS_NULL";
    ComparisonType[ComparisonType["IS_NOT_NULL"] = 2] = "IS_NOT_NULL";
    ComparisonType[ComparisonType["EQUAL"] = 3] = "EQUAL";
    ComparisonType[ComparisonType["NOT_EQUAL"] = 4] = "NOT_EQUAL";
    ComparisonType[ComparisonType["LESS"] = 5] = "LESS";
    ComparisonType[ComparisonType["LESS_OR_EQUAL"] = 6] = "LESS_OR_EQUAL";
    ComparisonType[ComparisonType["GREATER"] = 7] = "GREATER";
    ComparisonType[ComparisonType["GREATER_OR_EQUAL"] = 8] = "GREATER_OR_EQUAL";
    ComparisonType[ComparisonType["START_WITH"] = 9] = "START_WITH";
    ComparisonType[ComparisonType["NOT_START_WITH"] = 10] = "NOT_START_WITH";
    ComparisonType[ComparisonType["CONTAIN"] = 11] = "CONTAIN";
    ComparisonType[ComparisonType["NOT_CONTAIN"] = 12] = "NOT_CONTAIN";
    ComparisonType[ComparisonType["END_WITH"] = 13] = "END_WITH";
    ComparisonType[ComparisonType["NOT_END_WITH"] = 14] = "NOT_END_WITH";
    ComparisonType[ComparisonType["EXISTS"] = 15] = "EXISTS";
    ComparisonType[ComparisonType["NOT_EXISTS"] = 16] = "NOT_EXISTS";
})(ComparisonType = exports.ComparisonType || (exports.ComparisonType = {}));
var FilterType;
(function (FilterType) {
    FilterType[FilterType["equals"] = 0] = "equals";
    FilterType[FilterType["notEquals"] = 1] = "notEquals";
    FilterType[FilterType["in"] = 2] = "in";
    FilterType[FilterType["notIn"] = 3] = "notIn";
    FilterType[FilterType["gt"] = 4] = "gt";
    FilterType[FilterType["gte"] = 5] = "gte";
    FilterType[FilterType["lt"] = 6] = "lt";
    FilterType[FilterType["lte"] = 7] = "lte";
    FilterType[FilterType["contains"] = 8] = "contains";
    FilterType[FilterType["startsWith"] = 9] = "startsWith";
    FilterType[FilterType["endsWith"] = 10] = "endsWith";
})(FilterType = exports.FilterType || (exports.FilterType = {}));
var AggregationType;
(function (AggregationType) {
    AggregationType[AggregationType["NONE"] = 0] = "NONE";
    AggregationType[AggregationType["COUNT"] = 1] = "COUNT";
    AggregationType[AggregationType["SUM"] = 2] = "SUM";
    AggregationType[AggregationType["AVG"] = 3] = "AVG";
    AggregationType[AggregationType["MIN"] = 4] = "MIN";
    AggregationType[AggregationType["MAX"] = 5] = "MAX";
})(AggregationType = exports.AggregationType || (exports.AggregationType = {}));
const createFilterGroup = (logicalOperator) => {
    const filterGroup = window.Ext.create('Terrasoft.FilterGroup');
    if (logicalOperator) {
        filterGroup.logicalOperation = logicalOperator;
    }
    return filterGroup;
};
exports.createFilterGroup = createFilterGroup;
const createEqualsFilter = (column, value) => Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, column, value);
exports.createEqualsFilter = createEqualsFilter;
const createNotEqualsFilter = (column, value) => Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.NOT_EQUAL, column, value);
exports.createNotEqualsFilter = createNotEqualsFilter;
const createInFilter = (column, value) => Terrasoft.createColumnInFilterWithParameters(column, value);
exports.createInFilter = createInFilter;
const createNotInFilter = (column, value) => {
    const filter = Terrasoft.createColumnInFilterWithParameters(column, value);
    filter.comparisonType = Terrasoft.ComparisonType.NOT_EQUAL;
    return filter;
};
exports.createNotInFilter = createNotInFilter;
const createGreaterFilter = (column, value) => Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.GREATER, column, value);
exports.createGreaterFilter = createGreaterFilter;
const createGreaterOrEqualsFilter = (column, value) => Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.GREATER_OR_EQUAL, column, value);
exports.createGreaterOrEqualsFilter = createGreaterOrEqualsFilter;
const createLessFilter = (column, value) => Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.LESS, column, value);
exports.createLessFilter = createLessFilter;
const createLessOrEqualsFilter = (column, value) => Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.LESS_OR_EQUAL, column, value);
exports.createLessOrEqualsFilter = createLessOrEqualsFilter;
const createContainsFilter = (column, value) => Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.CONTAIN, column, value);
exports.createContainsFilter = createContainsFilter;
const createStartsWithFilter = (column, value) => Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.START_WITH, column, value);
exports.createStartsWithFilter = createStartsWithFilter;
const createEndsWithFilter = (column, value) => Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.END_WITH, column, value);
exports.createEndsWithFilter = createEndsWithFilter;
const createExistsFilter = (expression) => Terrasoft.createExistsFilter(expression);
exports.createExistsFilter = createExistsFilter;
const createNotExistsFilter = (expression) => Terrasoft.createNotExistsFilter(expression);
exports.createNotExistsFilter = createNotExistsFilter;
const createIsNullFilter = (column) => Terrasoft.createColumnIsNullFilter(column);
exports.createIsNullFilter = createIsNullFilter;
const createIsNotNullFilter = (column) => Terrasoft.createColumnIsNotNullFilter(column);
exports.createIsNotNullFilter = createIsNotNullFilter;


/***/ }),

/***/ "./exports.ts":
/*!********************!*\
  !*** ./exports.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCoreExports = void 0;
const businessRules = __importStar(__webpack_require__(/*! ./rules/business-rules */ "./rules/business-rules.ts"));
const http_1 = __webpack_require__(/*! ./http/http */ "./http/http.ts");
const features = __importStar(__webpack_require__(/*! ./features */ "./features.ts"));
const sysSettings = __importStar(__webpack_require__(/*! ./sys-settings */ "./sys-settings.ts"));
const processes = __importStar(__webpack_require__(/*! ./processes */ "./processes.ts"));
const rights = __importStar(__webpack_require__(/*! ./rights */ "./rights.ts"));
const getCoreExports = () => ({
    http: {
        client: {
            get: http_1.get,
            post: http_1.post,
            put: http_1.put
        }
    },
    features,
    sysSettings,
    processes,
    rights,
    rules: businessRules
});
exports.getCoreExports = getCoreExports;


/***/ }),

/***/ "./features.ts":
/*!*********************!*\
  !*** ./features.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isFeatureEnabled = void 0;
const isFeatureEnabled = (feature) => Terrasoft.Features.getIsEnabled(feature);
exports.isFeatureEnabled = isFeatureEnabled;


/***/ }),

/***/ "./http/http.ts":
/*!**********************!*\
  !*** ./http/http.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.put = exports.post = exports.get = exports.getCreatioUrl = void 0;
const http_1 = __webpack_require__(/*! ./models/http */ "./http/models/http.ts");
const mask_helper_1 = __webpack_require__(/*! ../view-interactors/mask-helper */ "./view-interactors/mask-helper.ts");
const modal_box_1 = __webpack_require__(/*! ../ui/modal-box */ "./ui/modal-box.ts");
const sendRequest = (resource, request, method, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const maskHelper = new mask_helper_1.MaskHelper();
    maskHelper.showBodyMask(options === null || options === void 0 ? void 0 : options.mask);
    const body = request ? JSON.stringify(request) : null;
    const response = yield fetch(getHttpResource(resource, (_a = options === null || options === void 0 ? void 0 : options.isAbsolute) !== null && _a !== void 0 ? _a : false), {
        method: method,
        headers: Object.assign((0, http_1.getDefaultHttpHeaders)(), (_b = options === null || options === void 0 ? void 0 : options.headers) !== null && _b !== void 0 ? _b : {}),
        body: body
    });
    return yield handleResponse(response, maskHelper, options);
});
const handleResponse = (response, maskHelper, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (response.status === http_1.HttpStatusCode.ServerError.InternalServerError ||
        response.status === http_1.HttpStatusCode.ClientError.BadRequest) {
        processInternalServerError(maskHelper, options);
    }
    maskHelper.hideBodyMask(options === null || options === void 0 ? void 0 : options.mask);
    const result = {
        success: response.ok,
        statusCode: response.status,
        headers: response.headers,
        data: null
    };
    if (result.statusCode !== http_1.HttpStatusCode.Successful.NoContent) {
        const responseText = yield response.text();
        result.data = responseText ? JSON.parse(responseText) : responseText;
    }
    return result;
});
const getHttpResource = (resource, isAbsolute) => {
    const baseUrl = (0, exports.getCreatioUrl)();
    if (isAbsolute) {
        return `${baseUrl}/${resource}`;
    }
    return `${baseUrl}/api/${resource}`;
};
const processInternalServerError = (maskHelper, options) => {
    maskHelper.hideBodyMask(options === null || options === void 0 ? void 0 : options.mask);
    (0, modal_box_1.showModalBox)('An error occurred during request. Please, contact system administrator.');
};
const getCreatioUrl = () => Terrasoft.utils.uri.getConfigurationWebServiceBaseUrl();
exports.getCreatioUrl = getCreatioUrl;
const get = (resource, request = {}, options) => __awaiter(void 0, void 0, void 0, function* () {
    const parameters = Object.getOwnPropertyNames(request)
        .map(x => `${x}=${request[x]}`)
        .join('&');
    let resourceWithParams = resource;
    if (parameters) {
        resourceWithParams += `?${parameters}`;
    }
    return sendRequest(resourceWithParams, null, http_1.HttpMethods.GET, options);
});
exports.get = get;
const post = (resource, request = {}, options) => __awaiter(void 0, void 0, void 0, function* () { return sendRequest(resource, request, http_1.HttpMethods.POST, options); });
exports.post = post;
const put = (resource, request = {}, options) => __awaiter(void 0, void 0, void 0, function* () { return sendRequest(resource, request, http_1.HttpMethods.PUT, options); });
exports.put = put;


/***/ }),

/***/ "./http/models/cookies.ts":
/*!********************************!*\
  !*** ./http/models/cookies.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCookie = void 0;
const getCookie = (name) => {
    const nameLenPlus = name.length + 1;
    return document.cookie
        .split(';')
        .map(c => c.trim())
        .filter(cookie => cookie.substring(0, nameLenPlus) === `${name}=`)
        .map(cookie => decodeURIComponent(cookie.substring(nameLenPlus)))[0] || null;
};
exports.getCookie = getCookie;


/***/ }),

/***/ "./http/models/http.ts":
/*!*****************************!*\
  !*** ./http/models/http.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpStatusCode = exports.getDefaultHttpHeaders = exports.HttpMethods = void 0;
const typescript_string_operations_1 = __webpack_require__(/*! typescript-string-operations */ "./node_modules/typescript-string-operations/dist/index.js");
const cookies_1 = __webpack_require__(/*! ./cookies */ "./http/models/cookies.ts");
var HttpMethods;
(function (HttpMethods) {
    HttpMethods["GET"] = "GET";
    HttpMethods["POST"] = "POST";
    HttpMethods["PUT"] = "PUT";
    HttpMethods["DELETE"] = "DELETE";
})(HttpMethods = exports.HttpMethods || (exports.HttpMethods = {}));
const getDefaultHttpHeaders = () => {
    var _a;
    return ({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        BPMCSRF: (_a = (0, cookies_1.getCookie)('BPMCSRF')) !== null && _a !== void 0 ? _a : typescript_string_operations_1.emptyString
    });
};
exports.getDefaultHttpHeaders = getDefaultHttpHeaders;
var HttpStatusCode;
(function (HttpStatusCode) {
    let Information;
    (function (Information) {
        Information[Information["Continue"] = 100] = "Continue";
    })(Information = HttpStatusCode.Information || (HttpStatusCode.Information = {}));
    let Successful;
    (function (Successful) {
        Successful[Successful["OK"] = 200] = "OK";
        Successful[Successful["Created"] = 201] = "Created";
        Successful[Successful["Accepted"] = 202] = "Accepted";
        Successful[Successful["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
        Successful[Successful["NoContent"] = 204] = "NoContent";
    })(Successful = HttpStatusCode.Successful || (HttpStatusCode.Successful = {}));
    let Redirection;
    (function (Redirection) {
        Redirection[Redirection["MultipleChoice"] = 300] = "MultipleChoice";
        Redirection[Redirection["MovedPermanently"] = 301] = "MovedPermanently";
        Redirection[Redirection["MovedTemporarily"] = 307] = "MovedTemporarily";
    })(Redirection = HttpStatusCode.Redirection || (HttpStatusCode.Redirection = {}));
    let ClientError;
    (function (ClientError) {
        ClientError[ClientError["BadRequest"] = 400] = "BadRequest";
        ClientError[ClientError["Unauthorized"] = 401] = "Unauthorized";
        ClientError[ClientError["Forbidden"] = 403] = "Forbidden";
        ClientError[ClientError["NotFound"] = 404] = "NotFound";
        ClientError[ClientError["MethodNotAllowed"] = 405] = "MethodNotAllowed";
        ClientError[ClientError["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    })(ClientError = HttpStatusCode.ClientError || (HttpStatusCode.ClientError = {}));
    let ServerError;
    (function (ServerError) {
        ServerError[ServerError["InternalServerError"] = 500] = "InternalServerError";
        ServerError[ServerError["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    })(ServerError = HttpStatusCode.ServerError || (HttpStatusCode.ServerError = {}));
})(HttpStatusCode = exports.HttpStatusCode || (exports.HttpStatusCode = {}));


/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable comma-dangle */
const exports_1 = __webpack_require__(/*! ./exports */ "./exports.ts");
module.exports = (0, exports_1.getCoreExports)();


/***/ }),

/***/ "./processes.ts":
/*!**********************!*\
  !*** ./processes.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.executeProcessById = exports.executeProcess = void 0;
const esq_1 = __webpack_require__(/*! ./db/esq */ "./db/esq.ts");
const features_1 = __webpack_require__(/*! ./features */ "./features.ts");
const require_1 = __webpack_require__(/*! ./require */ "./require.ts");
const typescript_string_operations_1 = __webpack_require__(/*! typescript-string-operations */ "./node_modules/typescript-string-operations/dist/index.js");
const getRunProcessOptions = (config) => ({
    schemaName: config.sysProcessName,
    parameterValues: Terrasoft.ProcessModuleUtilities._convertRequestParameters(config.parameters),
    resultParameterNames: config.resultParameters
});
const getProcessById = (sysProcessId) => __awaiter(void 0, void 0, void 0, function* () {
    const esq = new esq_1.EntitySchemaQuery({
        rootSchemaName: 'VwSysProcess',
        rowCount: 1
    });
    esq.addColumn('Name');
    esq.enablePrimaryColumnFilter(sysProcessId);
    return yield esq.queryFirst();
});
const getProcessByIdNotFoundResponse = (resources, sysProcessId) => ({
    errorInfo: {
        message: (0, typescript_string_operations_1.formatString)(resources.localizableStrings.ProcessSchemaNotFound, sysProcessId)
    },
    success: false
});
const canGetNextProcessStepsViaResponse = () => (0, features_1.isFeatureEnabled)('GetProcessStepsViaResponse');
const runProcess = (config) => {
    if (canGetNextProcessStepsViaResponse()) {
        const options = getRunProcessOptions(config);
        return new Promise(resolve => Terrasoft.ProcessEngineUtilities.runProcess(options, resolve));
    }
    else {
        return new Promise(resolve => Terrasoft.ProcessModuleUtilities._runProcessOld(config.sysProcessName, config.parameters, resolve));
    }
};
const executeProcess = (config) => {
    if (config.sysProcessName) {
        return runProcess(config);
    }
    else {
        return (0, exports.executeProcessById)(config);
    }
};
exports.executeProcess = executeProcess;
const executeProcessById = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const process = yield getProcessById(config.sysProcessId);
    if (process) {
        config.sysProcessName = process.$Name;
        return runProcess(config);
    }
    else {
        const resources = yield (0, require_1.requireAsync)(['ProcessModuleUtilitiesResources']);
        return getProcessByIdNotFoundResponse(resources, config.sysProcessId);
    }
});
exports.executeProcessById = executeProcessById;


/***/ }),

/***/ "./require.ts":
/*!********************!*\
  !*** ./require.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.requireAsync = void 0;
function requireAsync(schemas) {
    return new Promise(resolve => Terrasoft.require(schemas, resolve, this));
}
exports.requireAsync = requireAsync;


/***/ }),

/***/ "./rights.ts":
/*!*******************!*\
  !*** ./rights.ts ***!
  \*******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.canExecuteOperation = exports.getContactRoles = exports.canEdit = exports.getSchemaOperationRightLevel = exports.SchemaOperationRightPromise = exports.SchemaOperationRightLevel = void 0;
const esq_1 = __webpack_require__(/*! ./db/esq */ "./db/esq.ts");
const http_1 = __webpack_require__(/*! ./http/http */ "./http/http.ts");
var SchemaOperationRightLevel;
(function (SchemaOperationRightLevel) {
    SchemaOperationRightLevel[SchemaOperationRightLevel["None"] = 0] = "None";
    SchemaOperationRightLevel[SchemaOperationRightLevel["CanRead"] = 1] = "CanRead";
    SchemaOperationRightLevel[SchemaOperationRightLevel["CanAppend"] = 2] = "CanAppend";
    SchemaOperationRightLevel[SchemaOperationRightLevel["CanEdit"] = 4] = "CanEdit";
    SchemaOperationRightLevel[SchemaOperationRightLevel["CanDelete"] = 8] = "CanDelete";
})(SchemaOperationRightLevel = exports.SchemaOperationRightLevel || (exports.SchemaOperationRightLevel = {}));
class SchemaOperationRightPromise {
    constructor(promise) {
        this.promise = promise;
    }
    then(onfulfilled, onrejected) {
        return this.promise.then(onfulfilled, onrejected);
    }
    catch(onrejected) {
        return this.promise.catch(onrejected);
    }
    finally(onfinally) {
        return this.promise.finally(onfinally);
    }
    canRead() {
        return this.canDo(SchemaOperationRightLevel.CanRead);
    }
    canAppend() {
        return this.canDo(SchemaOperationRightLevel.CanAppend);
    }
    canEdit() {
        return this.canDo(SchemaOperationRightLevel.CanEdit);
    }
    canDelete() {
        return this.canDo(SchemaOperationRightLevel.CanDelete);
    }
    canDo(doLevel) {
        return new Promise(resolve => {
            this.promise.then((level) => {
                resolve((doLevel & level) === doLevel);
            });
        });
    }
}
exports.SchemaOperationRightPromise = SchemaOperationRightPromise;
Symbol.toStringTag;
const schemaOperationCache = {};
const getSchemaOperationRightLevel = (schemaName) => {
    const resolver = () => __awaiter(void 0, void 0, void 0, function* () {
        const cacheValue = schemaOperationCache[schemaName];
        if (cacheValue !== undefined && cacheValue !== null) {
            return cacheValue;
        }
        const response = yield (0, http_1.post)('rest/RightsService/GetSchemaOperationRightLevel', {
            schemaName
        }, {
            isAbsolute: true
        });
        const result = response.data.GetSchemaOperationRightLevelResult;
        schemaOperationCache[schemaName] = result;
        return result;
    });
    return new SchemaOperationRightPromise(resolver());
};
exports.getSchemaOperationRightLevel = getSchemaOperationRightLevel;
const canEdit = (request, throwOnError = false) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, http_1.post)('rest/RightsService/GetCanEdit', request, {
        isAbsolute: true
    });
    const result = response.data.GetCanEditResult === '';
    if (!result && !throwOnError) {
        throw new Error(response.data.GetCanEditResult);
    }
    return result;
});
exports.canEdit = canEdit;
const getContactRoles = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    const select = new esq_1.EntitySchemaQuery({
        rootSchemaName: 'SysUserInRole'
    });
    select.addColumn('SysRole');
    select.filters.addEqualsFilter('SysUser.Contact', contactId);
    const result = yield select.query();
    return result.collection.collection.items.map(x => x.$SysRole.value);
});
exports.getContactRoles = getContactRoles;
const canExecuteOperationCache = {};
const canExecuteOperation = (operation) => __awaiter(void 0, void 0, void 0, function* () {
    let result = canExecuteOperationCache[operation];
    if (result !== null && result !== undefined) {
        return result;
    }
    const response = yield (0, http_1.post)('rest/RightsService/GetCanExecuteOperation', {
        operation: operation
    }, {
        isAbsolute: true
    });
    result = response.data.GetCanExecuteOperationResult;
    canExecuteOperationCache[operation] = response.data.GetCanExecuteOperationResult;
    return result;
});
exports.canExecuteOperation = canExecuteOperation;


/***/ }),

/***/ "./rules/business-rules.ts":
/*!*********************************!*\
  !*** ./rules/business-rules.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFiltrationRule = exports.getDisabledAlwaysRule = exports.getRequiredAlwaysRule = exports.BusinessRuleValueType = exports.BusinessRuleProperty = exports.BusinessRuleType = void 0;
const filters_1 = __webpack_require__(/*! ../db/types/filters */ "./db/types/filters.ts");
var BusinessRuleType;
(function (BusinessRuleType) {
    BusinessRuleType[BusinessRuleType["DISABLED"] = -1] = "DISABLED";
    BusinessRuleType[BusinessRuleType["BINDPARAMETER"] = 0] = "BINDPARAMETER";
    BusinessRuleType[BusinessRuleType["FILTRATION"] = 1] = "FILTRATION";
    BusinessRuleType[BusinessRuleType["AUTOCOMPLETE"] = 2] = "AUTOCOMPLETE";
    BusinessRuleType[BusinessRuleType["POPULATE_ATTRIBUTE"] = 3] = "POPULATE_ATTRIBUTE";
})(BusinessRuleType = exports.BusinessRuleType || (exports.BusinessRuleType = {}));
var BusinessRuleProperty;
(function (BusinessRuleProperty) {
    BusinessRuleProperty[BusinessRuleProperty["VISIBLE"] = 0] = "VISIBLE";
    BusinessRuleProperty[BusinessRuleProperty["ENABLED"] = 1] = "ENABLED";
    BusinessRuleProperty[BusinessRuleProperty["REQUIRED"] = 2] = "REQUIRED";
    BusinessRuleProperty[BusinessRuleProperty["READONLY"] = 3] = "READONLY";
})(BusinessRuleProperty = exports.BusinessRuleProperty || (exports.BusinessRuleProperty = {}));
var BusinessRuleValueType;
(function (BusinessRuleValueType) {
    BusinessRuleValueType[BusinessRuleValueType["CONSTANT"] = 0] = "CONSTANT";
    BusinessRuleValueType[BusinessRuleValueType["ATTRIBUTE"] = 1] = "ATTRIBUTE";
    BusinessRuleValueType[BusinessRuleValueType["SYSSETTING"] = 2] = "SYSSETTING";
    BusinessRuleValueType[BusinessRuleValueType["SYSVALUE"] = 3] = "SYSVALUE";
    BusinessRuleValueType[BusinessRuleValueType["CARDSTATE"] = 4] = "CARDSTATE";
    BusinessRuleValueType[BusinessRuleValueType["PARAMETER"] = 5] = "PARAMETER";
    BusinessRuleValueType[BusinessRuleValueType["FORMULA"] = 6] = "FORMULA";
})(BusinessRuleValueType = exports.BusinessRuleValueType || (exports.BusinessRuleValueType = {}));
const getRequiredAlwaysRule = () => ({
    ruleType: BusinessRuleType.BINDPARAMETER,
    property: BusinessRuleProperty.REQUIRED,
    conditions: [
        {
            leftExpression: {
                type: BusinessRuleValueType.CONSTANT,
                value: true
            },
            comparisonType: filters_1.ComparisonType.EQUAL,
            rightExpression: {
                type: BusinessRuleValueType.CONSTANT,
                value: true
            }
        }
    ]
});
exports.getRequiredAlwaysRule = getRequiredAlwaysRule;
const getDisabledAlwaysRule = () => ({
    ruleType: BusinessRuleType.BINDPARAMETER,
    property: BusinessRuleProperty.ENABLED,
    conditions: [
        {
            leftExpression: {
                type: BusinessRuleValueType.CONSTANT,
                value: false
            },
            comparisonType: filters_1.ComparisonType.EQUAL,
            rightExpression: {
                type: BusinessRuleValueType.CONSTANT,
                value: true
            }
        }
    ]
});
exports.getDisabledAlwaysRule = getDisabledAlwaysRule;
const getFiltrationRule = (filterableEntityColumnName, compareToColumnName, options) => Object.assign({
    ruleType: BusinessRuleType.FILTRATION,
    autocomplete: true,
    autoClean: true,
    baseAttributePatch: filterableEntityColumnName,
    comparisonType: filters_1.ComparisonType.EQUAL,
    type: BusinessRuleValueType.ATTRIBUTE,
    attribute: compareToColumnName
}, options || {});
exports.getFiltrationRule = getFiltrationRule;


/***/ }),

/***/ "./sys-settings.ts":
/*!*************************!*\
  !*** ./sys-settings.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSysSetting = exports.getSysSettings = void 0;
const http_1 = __webpack_require__(/*! ./http/http */ "./http/http.ts");
const data_value_types_1 = __webpack_require__(/*! ./types/data-value-types */ "./types/data-value-types.ts");
const settingsCache = {};
const mapSysSettingResponseValue = (response) => {
    if (response.value === null || response.value === undefined) {
        return null;
    }
    if ((0, data_value_types_1.isDateDataValueType)(response.dataValueType)) {
        return Terrasoft.parseDate(response.value);
    }
    else if ((0, data_value_types_1.isLookupDataValueType)(response.dataValueType)) {
        return {
            value: response.value,
            displayValue: response.displayValue
        };
    }
    return response.value;
};
const querySysSettings = (codes) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, http_1.post)('DataService/json/SyncReply/QuerySysSettings', {
        sysSettingsNameCollection: codes
    }, {
        isAbsolute: true
    });
    return response;
});
const processCachedSettings = (codes, resultSettings) => {
    const settingsToQuery = [];
    codes.forEach(code => {
        if (settingsCache.hasOwnProperty(code)) {
            resultSettings[code] = settingsCache[code];
        }
        else {
            settingsToQuery.push(code);
        }
    });
    return settingsToQuery;
};
const getSysSettings = (codes) => __awaiter(void 0, void 0, void 0, function* () {
    const resultSettings = {};
    const codesToQuery = processCachedSettings(codes, resultSettings);
    const settingsResponse = yield querySysSettings(codesToQuery);
    for (const property in settingsResponse.data.values) {
        const setting = settingsResponse.data.values[property];
        const value = mapSysSettingResponseValue(setting);
        if (setting.isCacheable) {
            settingsCache[property] = value;
        }
        else {
            delete settingsCache[property];
        }
        resultSettings[property] = value;
    }
    return resultSettings;
});
exports.getSysSettings = getSysSettings;
const getSysSetting = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const sysSettings = yield (0, exports.getSysSettings)([code]);
    return sysSettings[code];
});
exports.getSysSetting = getSysSetting;


/***/ }),

/***/ "./types/data-value-types.ts":
/*!***********************************!*\
  !*** ./types/data-value-types.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isDateDataValueType = exports.isLookupDataValueType = exports.DataValueType = void 0;
var DataValueType;
(function (DataValueType) {
    DataValueType[DataValueType["GUID"] = 0] = "GUID";
    DataValueType[DataValueType["TEXT"] = 1] = "TEXT";
    DataValueType[DataValueType["INTEGER"] = 4] = "INTEGER";
    DataValueType[DataValueType["FLOAT"] = 5] = "FLOAT";
    DataValueType[DataValueType["MONEY"] = 6] = "MONEY";
    DataValueType[DataValueType["DATE_TIME"] = 7] = "DATE_TIME";
    DataValueType[DataValueType["DATE"] = 8] = "DATE";
    DataValueType[DataValueType["TIME"] = 9] = "TIME";
    DataValueType[DataValueType["LOOKUP"] = 10] = "LOOKUP";
    DataValueType[DataValueType["ENUM"] = 11] = "ENUM";
    DataValueType[DataValueType["BOOLEAN"] = 12] = "BOOLEAN";
    DataValueType[DataValueType["BLOB"] = 13] = "BLOB";
    DataValueType[DataValueType["IMAGE"] = 14] = "IMAGE";
    DataValueType[DataValueType["CUSTOM_OBJECT"] = 15] = "CUSTOM_OBJECT";
    DataValueType[DataValueType["IMAGELOOKUP"] = 16] = "IMAGELOOKUP";
    DataValueType[DataValueType["COLLECTION"] = 17] = "COLLECTION";
    DataValueType[DataValueType["COLOR"] = 18] = "COLOR";
    DataValueType[DataValueType["LOCALIZABLE_STRING"] = 19] = "LOCALIZABLE_STRING";
    DataValueType[DataValueType["ENTITY"] = 20] = "ENTITY";
    DataValueType[DataValueType["ENTITY_COLLECTION"] = 21] = "ENTITY_COLLECTION";
    DataValueType[DataValueType["ENTITY_COLUMN_MAPPING_COLLECTION"] = 22] = "ENTITY_COLUMN_MAPPING_COLLECTION";
    DataValueType[DataValueType["HASH_TEXT"] = 23] = "HASH_TEXT";
    DataValueType[DataValueType["SECURE_TEXT"] = 24] = "SECURE_TEXT";
    DataValueType[DataValueType["FILE"] = 25] = "FILE";
    DataValueType[DataValueType["MAPPING"] = 26] = "MAPPING";
    DataValueType[DataValueType["MEDIUM_TEXT"] = 28] = "MEDIUM_TEXT";
    DataValueType[DataValueType["SHORT_TEXT"] = 27] = "SHORT_TEXT";
    DataValueType[DataValueType["MAXSIZE_TEXT"] = 29] = "MAXSIZE_TEXT";
    DataValueType[DataValueType["LONG_TEXT"] = 30] = "LONG_TEXT";
    DataValueType[DataValueType["FLOAT1"] = 31] = "FLOAT1";
    DataValueType[DataValueType["FLOAT2"] = 32] = "FLOAT2";
    DataValueType[DataValueType["FLOAT3"] = 33] = "FLOAT3";
    DataValueType[DataValueType["FLOAT4"] = 34] = "FLOAT4";
    DataValueType[DataValueType["LOCALIZABLE_PARAMETER_VALUES_LIST"] = 35] = "LOCALIZABLE_PARAMETER_VALUES_LIST";
    DataValueType[DataValueType["METADATA_TEXT"] = 36] = "METADATA_TEXT";
    DataValueType[DataValueType["STAGE_INDICATOR"] = 37] = "STAGE_INDICATOR";
    DataValueType[DataValueType["OBJECT_LIST"] = 38] = "OBJECT_LIST";
    DataValueType[DataValueType["COMPOSITE_OBJECT_LIST"] = 39] = "COMPOSITE_OBJECT_LIST";
    DataValueType[DataValueType["FLOAT8"] = 40] = "FLOAT8";
    DataValueType[DataValueType["FILE_LOCATOR"] = 41] = "FILE_LOCATOR";
})(DataValueType = exports.DataValueType || (exports.DataValueType = {}));
const isLookupDataValueType = (dataValueType) => dataValueType === DataValueType.LOOKUP || dataValueType === DataValueType.ENUM;
exports.isLookupDataValueType = isLookupDataValueType;
const isDateDataValueType = (dataValueType) => dataValueType === DataValueType.DATE ||
    dataValueType === DataValueType.DATE_TIME ||
    dataValueType === DataValueType.TIME;
exports.isDateDataValueType = isDateDataValueType;


/***/ }),

/***/ "./ui/modal-box.ts":
/*!*************************!*\
  !*** ./ui/modal-box.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.showConfirmationModalBox = exports.showModalBox = void 0;
const showModalBox = (message, handler) => {
    Terrasoft.showInformation(message, handler, this);
};
exports.showModalBox = showModalBox;
const showConfirmationModalBox = (message, buttons) => new Promise(resolve => {
    Terrasoft.utils.showConfirmation(message, resolve, buttons);
});
exports.showConfirmationModalBox = showConfirmationModalBox;


/***/ }),

/***/ "./view-interactors/mask-helper.ts":
/*!*****************************************!*\
  !*** ./view-interactors/mask-helper.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaskHelper = void 0;
const typedi_1 = __webpack_require__(/*! typedi */ "./node_modules/typedi/esm5/index.js");
let MaskHelper = class MaskHelper {
    constructor() {
        this._bodyMaskId = undefined;
        this._uniqueMaskId = undefined;
        this._defaultMaskCssSelector = 'body';
    }
    showBodyMask(config) {
        if (this._uniqueMaskId) {
            return;
        }
        this._uniqueMaskId = config === null || config === void 0 ? void 0 : config.uniqueMaskId;
        const maskId = Terrasoft.Mask.show(config);
        this._bodyMaskId = maskId || this._bodyMaskId;
    }
    hideBodyMask(config) {
        if (this._uniqueMaskId && !(config && config.uniqueMaskId === this._uniqueMaskId)) {
            return;
        }
        this._uniqueMaskId = undefined;
        let maskSelector = this._defaultMaskCssSelector;
        if (config) {
            if (config.maskId) {
                Terrasoft.Mask.hide(config.maskId);
            }
            maskSelector = config === null || config === void 0 ? void 0 : config.selector;
        }
        else if (!this._bodyMaskId) {
            Terrasoft.Mask.hide(this._bodyMaskId);
        }
        Terrasoft.Mask.clearMasks(maskSelector);
    }
    updateBodyMaskCaption(maskId, caption) {
        Terrasoft.Mask.updateCaption(maskId, caption);
    }
};
MaskHelper = __decorate([
    (0, typedi_1.Service)()
], MaskHelper);
exports.MaskHelper = MaskHelper;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});;
//# sourceMappingURL=el-core.js.map