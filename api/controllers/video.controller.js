import Video from "../models/video.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a video"));
  }
  const { title, content, videoUrl, thumbnail } = req.body;

  if (!title || !content || !videoUrl || !thumbnail) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  const slug = title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newVideo = new Video({
    title,
    content,
    videoUrl,
    thumbnail, // Include the thumbnail URL here
    slug,
    userId: req.user.id,
  });

  try {
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    next(error);
  }
};

export const getvideos = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    // Construct the query
    const query = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.videoId && { _id: req.query.videoId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };

    // Find videos based on the query
    const videos = await Video.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    // Get total count of videos
    const totalVideos = await Video.countDocuments(query);

    // Get count of videos created in the last month
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthVideos = await Video.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    // Send response with video data
    res.status(200).json({
      videos,
      totalVideos,
      lastMonthVideos,
    });
  } catch (error) {
    next(error);
  }
};

export const deletevideo = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this video"));
  }
  try {
    await Video.findByIdAndDelete(req.params.videoId);
    res.status(200).json("The video has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updatevideo = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this video"));
  }

  const { title, content, thumbnail, videoUrl } = req.body;

  // Validate required fields
  if (!title || !content || !videoUrl) {
    return next(
      errorHandler(400, "Title, content, and video URL are required")
    );
  }

  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.videoId,
      {
        $set: {
          title,
          content,
          thumbnail, // Allow updating of thumbnail
          videoUrl, // Allow updating of video URL
        },
      },
      { new: true }
    );

    if (!updatedVideo) {
      return next(errorHandler(404, "Video not found"));
    }

    res.status(200).json(updatedVideo);
  } catch (error) {
    next(error);
  }
};
