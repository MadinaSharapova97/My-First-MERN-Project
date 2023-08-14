export function asserIsDefined<T>(val:T):asserts val is NonNullable<T>{
    if(!val){
        throw Error("Expected 'va' to be defined, but received " + val)
    }
}