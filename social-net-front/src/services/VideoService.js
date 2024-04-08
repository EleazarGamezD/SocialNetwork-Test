import axios from "axios";
import { ref } from "vue";
export class VideoService {
  baseUrl = "http://localhost:3000";
  allVideoData;

  constructor() {
    this.allVideoData = ref([]);
  }
  getVideos() {
    return this.allVideoData;
  }
  async getAllVideos() {
    try {
      const response = await axios.get(`${this.baseUrl}/video/getallvideos`);
      this.allVideoData.value = response.data;
      console.log(this.allVideoData.value);
      return response.data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
export default VideoService;
