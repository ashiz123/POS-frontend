# CUSTOM HOOKS

It's created using factory pattern.Factory pattern is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. Its use over the class because it can use in callback function, total control over return object like gatekeeper.

1.  Custom hooks like useForm.ts is created once, and than it does all the form operations .Just you need to pass required data for that hook
2.  In the case of useForm.ts, It require intialFormData is the object and zod schema for validation
    const useForm = (initalFormData, validation)
3.  Hooks have its own state and method.
4.  It return some data and functions to component. It also return callback function like this onSubmit={(e) => handleSubmit(e, formSubmit)}
    so, the handleSubmit return the callback function callback(data) to the component as child.
