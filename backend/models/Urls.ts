import mongoose  from "mongoose";

const Schema = mongoose.Schema;

const UrlsSchema = new Schema({
  shortUrl:{
    type: String,
    required: true
  },
  originalUrl:{
    type: String,
    required: true
  }
})

const Url = mongoose.model('Product', UrlsSchema);

export default Url