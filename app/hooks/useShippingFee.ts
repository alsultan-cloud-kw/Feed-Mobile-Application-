// // hooks/useShippingFee.ts
// import { useState, useEffect } from "react";
// import axios from "axios";

// const useShippingFee = () => {
//   const [shippingFee, setShippingFee] = useState<number>(0);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchShippingFee = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/shipping-fees/`,
//           {
//             headers: {
//               Authorization: `Bearer ${process.env.EXPO_PUBLIC_SHIPPING_FEE}`,
//             },
//           }
//         );

//         // Extract the fee from the first item in the data array
//         const fee = response.data.data[0]?.fee ?? 0;
//         setShippingFee(fee);
//       } catch (err) {
//         console.error("Error fetching shipping fee:", err);
//         setError("Failed to fetch shipping fee");
//         // Fallback to 0 if there's an error
//         setShippingFee(0);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchShippingFee();
//   }, []);

//   return { shippingFee, loading, error };
// };

// export default useShippingFee;

/************************************/

import { useState, useEffect } from "react";
import axios from "axios";

const useShippingFee = () => {
  const [shippingFee, setShippingFee] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShippingFee = async () => {
      if (
        !process.env.EXPO_PUBLIC_STRAPI_API_URL ||
        !process.env.EXPO_PUBLIC_STRAPI_API_USERNAME ||
        !process.env.EXPO_PUBLIC_STRAPI_API_PASSWORD
      ) {
        setError("Missing required environment variables");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_STRAPI_API_URL}/api/shipping-fees/`,
          {
            auth: {
              username: process.env.EXPO_PUBLIC_STRAPI_API_USERNAME,
              password: process.env.EXPO_PUBLIC_STRAPI_API_PASSWORD,
            },
            timeout: 10000,
          }
        );
        setShippingFee(response.data.data[0]?.fee ?? 0);
      } catch (err) {
        console.error("Error fetching shipping fee:", err);
        setError("Failed to fetch shipping fee");
        setShippingFee(0);
      } finally {
        setLoading(false);
      }
    };

    fetchShippingFee();
  }, []);

  return { shippingFee, loading, error };
};

export default useShippingFee;
