import axios from "axios";
import { ref } from "vue";
export class VideoService {
  baseUrl = "http://localhost:3000";
  allVideoData;
  page = 0;
  constructor() {
    this.allVideoData = ref([]);
  }

  async getAllVideos(page) {
    return await axios.get(
      `${this.baseUrl}/video/getallvideos` + `?limit=3&offset=${page}`
    );
  }

  async getVideoById(videoId) {
    return await axios.get(`${this.baseUrl}/video/streamVideo/${videoId}`);
  }
}
export default VideoService;
