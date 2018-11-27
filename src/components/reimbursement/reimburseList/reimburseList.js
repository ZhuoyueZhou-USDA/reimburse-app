import React, { Component } from "react";
import "./reimburseList.css";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
class RecordList extends Component {
  render() {
    console.log("props", this.props);
    const { reimburse, auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container section project-details">
        <ul className="record-list-con">
          {reimburse &&
            reimburse.map((item, index) => {
              let bottom_msg = "";
              if (item.status === "New") {
                bottom_msg =
                  "Please allow 3-4 business days for the request been reviewed.";
              } else if (item.status === "Under Review") {
                bottom_msg = "Your reinburse request is under reviewing.";
              } else if (item.status === "Confirmed") {
                bottom_msg = "Your request is approved.";
              } else {
                bottom_msg = "Your request is denied.";
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
              // console.log(item.createAt.seconds);
              // console.log(date);
              return (
                <li className="record-item" key={index}>
                  <section className="record-item-header">
                    <span>Submit at：{month + " " + date + ", " + year}</span>
                    <span className="status_cls">{item.status}</span>
                  </section>
                  <section className="record-item-content">
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
    );
  }
}
const mapStateToProps = state => {
  console.log("map state to props", state);
  return {
    // reimburse: state.reimburse.reimburse
    reimburse: state.firestore.ordered.reimburseRequests,
    auth: state.firebase.auth
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "reimburseRequests" }])
)(RecordList);
