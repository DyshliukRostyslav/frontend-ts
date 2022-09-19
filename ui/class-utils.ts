const callerMethodRegex = /at \w+\.(\w+)/

function getCallerMethodName(): string {
  let err = new Error();
  let stack = err.stack as string;
  let splitStack = stack.split('\n') as Array<string>;
  let callerMethodName = (callerMethodRegex.exec(splitStack[4]) as RegExpExecArray)[1];
  if (callerMethodName === "callBase") {
    callerMethodName = (callerMethodRegex.exec(splitStack[5]) as RegExpExecArray)[1];
  }
  return callerMethodName;
}

function getLastClassMethod(methodName: string): any {
  let method = this[methodName];
  while (!method.$ownerClass) {
    method = method.$owner.superclass[methodName];
  }
  return method;
}

function getNextMethodOwner(current: any, methodName: string): any {
  let superclass = current.__proto__;
  while (!superclass.hasOwnProperty(methodName) && superclass.constructor !== this.getMethodOwnerClass()) {
    superclass = superclass.__proto__
  }
  return superclass;
}

export function methods(): any {
  let currentClass = this.__proto__;
  let classMethods = Object.getOwnPropertyNames(currentClass)
    .filter(x => x !== "constructor" && typeof currentClass[x] === "function");

  const { Ext, ...scope } = this;
  let methods = {
    scope: scope,
    callBase: callBase,
    getBaseMethod: getBaseMethod
  };

  classMethods.forEach(method => {
    currentClass[method].$ownerClass = currentClass;
    currentClass[method].$originalOwner = currentClass;
    methods[method] = currentClass[method];
  });
  return methods;
}

function callBase(args: any): any {
  const parentMethod = this.getBaseMethod();
  return parentMethod.apply(this, args);
}

function getBaseMethod(scope?: any, args?: any): Function {
  const methodName = getCallerMethodName();
  const method = getLastClassMethod.call(this, methodName);
  const current = method.$ownerClass;
  const superclass = getNextMethodOwner.call(this, current, methodName);
  let parentMethod = superclass.constructor === this.getMethodOwnerClass()
    ? current[methodName].$owner.superclass[methodName]
    : superclass[methodName];
  method.$ownerClass = superclass.constructor === this.getMethodOwnerClass()
    ? method.$originalOwner
    : parentMethod.$ownerClass;

  if (parentMethod && arguments.length > 1) {
    const argsArray = Array.prototype.slice.call(args || []);
    parentMethod = Function.prototype.bind.apply(parentMethod, [scope].concat(argsArray));
  }

  return parentMethod ?? function() {};
}
