export default () => {
  return async (ctx, next) => {
    console.log('middle3 start');
    
    await next();

    console.log('middle3 end');
  }
}