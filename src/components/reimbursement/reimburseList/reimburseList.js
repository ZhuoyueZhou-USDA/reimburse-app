import React, { Component } from "react";
import "./reimburseList.css";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Notifications from '../notifications'
import { updateReimburseStatus } from "../../../store/action/reimburseActions";
class RecordList extends Component {
  handleStatusUpdate =  (event) => {
  
    console.log(event.target.value);
    console.log(event.target.id);
    const update_val = {
      status:event.target.value,
      id: event.target.id
    }
    this.props.updateReimburseStatus(update_val);
}
  render() {
    
    console.log("props", this.props);
    const { reimburse, auth,notifications, profile } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m8">
            
      <div className=" section project-details">
        <ul className="record-list-con">
          {reimburse &&
            reimburse.map((item, index) => {
              let bottom_msg = "";
              if (item.status === "New") {
                bottom_msg =
                  "Please allow 3-4 business days for the request been reviewed.";
              } else if (item.status === "Under Review") {
                bottom_msg = "Your reinburse request is under reviewing.";
              } else if (item.status === "Confirm") {
                bottom_msg = "Your request is approved.";
              } else {
                bottom_msg = "Your request is denied.";
              }
              let status_msg='';
              if(profile.type==='admin'){
                status_msg=<select value={item.status} id={item.id} onChange={this.handleStatusUpdate} style={{display:"inlineBlock"}}>
                <option  value="New">New</option>
                <option value="Confirm">Confirm</option>
                <option value="Under Review">Under Review</option>
                <option value="Deny">Deny</option></select>
              }else{
                status_msg = item.status
              }

              const date_time = new Date(item.createAt.seconds * 1000);
              var months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
              ];
              var year = date_time.getFullYear();
              var month = months[date_time.getMonth()];
              var date = date_time.getDate();
              
              return (
                <li className="record-item" key={index}>
                  <section className="record-item-header">
                    <div>Submit at：{month + " " + date + ", " + year}</div>
                    
                    <span className="status_cls">{status_msg}</span>
                  </section>
                  <section className="record-item-content">
                  <p>
                      <span>Id: </span>&emsp;
                      {item.id}
                    </p>
                    <p>
                      <span>User: </span>&emsp;
                      {item.submitFirstName + " " + item.submitLastName}
                    </p>
                    <p>
                      <span>Amount：</span>&emsp; ${item.amount}
                    </p>
                    <p>
                      <span>Comments：</span>
                      &emsp;{item.comment}
                    </p>
                  </section>
                  <p className="record-item-footer">{bottom_msg}</p>
                </li>
              );
            })}
        </ul>
      </div>
      
      </div>
          <div className="col s12 m3 offset-m1">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("map state to props", state);
  return {
    // reimburse: state.reimburse.reimburse
    reimburse: state.firestore.ordered.reimburseRequests,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    profile: state.firebase.profile
  };
};
const mapDispatchToProps = dispatch =>{
  return {
    updateReimburseStatus: reimburse => dispatch(updateReimburseStatus(reimburse))
  };
}
export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([{ collection: "reimburseRequests",orderBy:['createAt','desc'] },{ collection: 'notifications', limit: 5, orderBy:['time','desc']}])
)(RecordList);
