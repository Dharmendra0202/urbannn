declare module 'react-native-razorpay' {
  const RazorpayCheckout: {
    open: (options: Record<string, any>) => Promise<any>;
  };
  export default RazorpayCheckout;
}
