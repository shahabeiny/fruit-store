"use client";
import { useSaveRateMutation } from "@/redux/store/product/productSlice";
import { Rating } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useReduxhook";
import { selectCurrentToken } from "@/redux/store/auth/authSlice";
import { showToast } from "@/utils/tostifyalert";

type RatingProps = {
  className?: string;
  value: number;
  id: string;
};

const RatingStar: FC<RatingProps> = ({ value, className, id }) => {
  const [rate, setRate] = useState(0);
  const token = useAppSelector(selectCurrentToken);
  const [saveRate] = useSaveRateMutation();

  useEffect(() => {
    setRate(value);
  }, [value]);

  const handleRating = async (
    event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    if (newValue !== null && token) {
      try {
        let result = await saveRate({ productId: id, rate: newValue }).unwrap();
        setRate(result);
        showToast("امتیاز شما با موفقیت ثبت شد", "success");
      } catch (error: any) {
        const msg = error.data ? error.data.message : "خطا در انجام درخواست";
        showToast(msg, "error");
      }
    } else {
      showToast("برای دادن امتیاز باید وارد شوید", "error");
    }
  };

  return (
    <Rating
      className={`text-ltr ${className || ""}`}
      value={rate || 0}
      precision={1}
      name="size-large"
      size="large"
      readOnly={rate > 0}
      onChange={handleRating}
    />
  );
};

export default memo(RatingStar);
