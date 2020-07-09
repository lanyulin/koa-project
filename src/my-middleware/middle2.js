export default () => {
  return async (ctx, next) => {
    console.log('middle2 start');
    
    await next();

    console.log('middle2 end');
  }
}