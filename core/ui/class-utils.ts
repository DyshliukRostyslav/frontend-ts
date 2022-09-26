import ErrorStackParser from 'error-stack-parser';

const callerMethodRegex = /\w+\.(\w+)/;

function getCallerMethodName(): string {
  const err = new Error();
  const stack = ErrorStackParser.parse(err);
  const methodNames = (stack.map(x => x.functionName).filter(Boolean) as Array<string>)
    .map(x => callerMethodRegex.test(x)
      ? (callerMethodRegex.exec(x) as RegExpExecArray)[1]
      : x);
  const index = methodNames.indexOf('getBaseMethod') + 1;
  let callerMethodName = methodNames[index];
  if (callerMethodName === 'callBase') {
    callerMethodName = methodNames[index + 1];
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
    superclass = superclass.__proto__;
  }
  return superclass;
}

export function methods(): any {
  const currentClass = this.__proto__;
  const classMethods = Object.getOwnPropertyNames(currentClass)
    .filter(x => x !== 'constructor' && typeof currentClass[x] === 'function');

  const { ...scope } = this;
  const resultMethods = {
    scope: scope,
    callBase: callBase,
    getBaseMethod: getBaseMethod
  };

  classMethods.forEach(method => {
    currentClass[method].$ownerClass = currentClass;
    currentClass[method].$originalOwner = currentClass;
    resultMethods[method] = currentClass[method];
  });
  return resultMethods;
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

  return parentMethod ?? function(): void {};
}

export function getLocalizedString(key: string): string {
  return this.get(`Resources.Strings.${key}`) as string;
}

export function getLocalizedImage(key: string): any {
  return this.get(`Resources.Images.${key}`);
}
