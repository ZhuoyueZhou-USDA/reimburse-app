import React, { Component } from "react";
import { connect } from "react-redux";
import { createReimburse } from "../../store/action/reimburseActions";
import { Redirect } from "react-router-dom";
// import API from '@/api/api';
// import envconfig from '@/envconfig/envconfig';
class NewRequest extends Component {
  state = {
    purpose: "",
    amount: "",
    attachment: "",
    comment: "",
    date: ""
  };
  handleChange = e => {
    console.log(e);
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    console.log(this.state);
    e.preventDefault();
    this.props.createReimburse(this.state);
  };
  //       /*
  //   upload image url to redux
  //    */
  //   uploadImg = async event => {
  //     try{
  //       let formdata = new FormData();
  //       formdata.append('file', event.target.files[0]);
  //       let result = await API.uploadImg({data: formdata});
  //       this.props.saveImg(envconfig.imgUrl + result.image_path);
  //       console.log(result);
  //     }catch(err){
  //       console.error(err);
  //     }
  //   }
  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">New Re-imburse Form</h5>
          <div className="input-field">
            <label htmlFor="purpose">Purpose</label>
            <input type="text" id="purpose" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="date">Date </label>
            <input
              type="text"
              id="date"
              placeholder="MM/YYYY"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="amount">Amount</label>
            <input type="text" id="amount" onChange={this.handleChange} />
          </div>
          {/* <div className="file-field input-field">
            <div className="btn">
              <span>attachment</span>
              <input type="file" id="attachment" onChange={this.handleChange} />
              <input type="file" />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                placeholder="upload your receipt"
              />
            </div>
          </div> */}
          {/* <div className="input-field">
                        <label htmlFor="file">File</label>
                        <input type="file" id="file" onChange={this.handleChange} />
                     </div> */}
          <div className="input-field">
            <label htmlFor="comment">Comment</label>
            <input type="text" id="comment" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createReimburse: reimburse => dispatch(createReimburse(reimburse))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRequest);
