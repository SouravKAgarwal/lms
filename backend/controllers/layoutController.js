import ErrorHandler from "../config/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";
import Layout from "../models/Layout.js";

export const createLayout = catchAsyncError(async (req, res, next) => {
  try {
    const { type } = req.body;

    const isTypeExists = await Layout.findOne({ type });
    if (isTypeExists)
      return next(new ErrorHandler(`${type} already exists`, 400));

    if (type === "Banner") {
      const { image, title, subTitle } = req.body;

      const myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: "banners",
      });

      const banner = {
        type: "Banner",
        banner: {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        },
      };

      await Layout.create(banner);
    }

    if (type === "FAQ") {
      const { faqData } = req.body;
      const faqItems = await Promise.all(
        faqData.map(async (item) => {
          return {
            question: item.question,
            answer: item.answer,
          };
        })
      );
      await Layout.create({ type: "FAQ", faq: faqItems });
    }

    if (type === "Categories") {
      const { categories } = req.body;

      const categoryItems = await Promise.all(
        categories.map(async (item) => {
          return {
            title: item.title,
          };
        })
      );
      await Layout.create({ type: "Categories", categories: categoryItems });
    }

    res.status(200).json({
      success: true,
      message: `${type} created succesfully`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const editLayout = catchAsyncError(async (req, res, next) => {
  try {
    const { type } = req.body;

    if (type === "Banner") {
      const { image, title, subTitle } = req.body;
      const bannerData = await Layout.findOne({ type: "Banner" });

      const data = image.startsWith("https")
        ? bannerData
        : await cloudinary.v2.uploader.upload(image, {
            folder: "layouts",
          });

      const banner = {
        type: "Banner",
        banner: {
          image: {
            public_id: image.startsWith("https")
              ? bannerData.banner.image.public_id
              : data?.public_id,
            url: image.startsWith("https")
              ? bannerData.banner.image.url
              : data.secure_url,
          },
          title,
          subTitle,
        },
      };

      await Layout.findByIdAndUpdate(bannerData._id, banner);
    }

    if (type === "FAQ") {
      const { faq } = req.body;
      const faqData = await Layout.findOne({ type: "FAQ" });

      const faqItems = await Promise.all(
        faq.map(async (item) => {
          return {
            question: item.question,
            answer: item.answer,
          };
        })
      );
      await Layout.findByIdAndUpdate(faqData._id, { faq: faqItems });
    }

    if (type === "Categories") {
      const { categories } = req.body;
      const categoryData = await Layout.findOne({ type: "Categories" });

      const categoryItems = await Promise.all(
        categories.map(async (item) => {
          return {
            title: item.title,
          };
        })
      );
      await Layout.findByIdAndUpdate(categoryData._id, {
        categories: categoryItems,
      });
    }

    res.status(200).json({
      success: true,
      message: `${type} updated succesfully`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getLayoutByType = catchAsyncError(async (req, res, next) => {
  try {
    const { type } = req.params;
    const layout = await Layout.findOne({ type });
    res.status(201).json({
      success: true,
      layout,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
