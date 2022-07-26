import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CreditCart = (props) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M16.5 11a.5.5 0 0 0-.5.5V15H2V9h5.5a.5.5 0 0 0 0-1H2V6h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3.5a.5.5 0 0 0-.5-.5Z"
      fill="#fff"
    />
    <Path
      d="M5.5 11h-2a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1ZM16.697 3.54l-3.5-1.5a.51.51 0 0 0-.395 0l-3.5 1.5A.501.501 0 0 0 9 4v2c0 2.75 1.017 4.359 3.751 5.934a.502.502 0 0 0 .498 0C15.983 10.363 17 8.754 17 6V4a.5.5 0 0 0-.303-.46ZM16 6c0 2.309-.764 3.58-3 4.92-2.236-1.343-3-2.614-3-4.92V4.33l3-1.286 3 1.286V6Z"
      fill="#fff"
    />
    <Path
      d="M14.813 5.109a.503.503 0 0 0-.703.078l-1.572 1.966-.622-.93a.5.5 0 0 0-.832.554l1 1.5a.504.504 0 0 0 .395.223h.021a.5.5 0 0 0 .391-.188l2-2.5a.5.5 0 0 0-.078-.703Z"
      fill="#fff"
    />
  </Svg>
)

export default CreditCart;
