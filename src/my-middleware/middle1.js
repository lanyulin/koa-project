export default () => {
  return async (ctx, next) => {
    console.log('middle1 start');
    
    await next()
    
    console.log('middle1 end');
  }
}