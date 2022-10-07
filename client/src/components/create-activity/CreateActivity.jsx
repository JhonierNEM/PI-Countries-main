import { Component } from "react";
import { connect } from "react-redux";
import styles from "./CreateActivity.module.css";

import iconssuccess from "../../images/iconssuccess.png";

import { searchName, postActivities } from "../../utils/utils";
import { validationsInputs } from "../../utils/validations";
import { disableButton, divTime, spanStyle } from "../../utils/changeStyles";

class CreateActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: {
        name: "",
        difficulty: 1,
        duration: 0,
        season: "summer",
      },
      countries: [],
      activities: [],
    };
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleStateChangeAddCountries =
      this.handleStateChangeAddCountries.bind(this);
    this.deleteCountry = this.deleteCountry.bind(this);
    this.addActivity = this.addActivity.bind(this);
    this.createActivities = this.createActivities.bind(this);
  }

  handleStateChange({ target }) {
    let value = target.value.trimStart();
    let validation;
    if (target.name === "duration") {
      let time = document.getElementById("time").value;
      validation = validationsInputs(target.name, value, time);
      value = validation.newValue;
    } else {
      validation = validationsInputs(target.name, value);
    }

    if (target.name === "name" || target.name === "duration") {
      spanStyle(
        `error-msg-${target.name}`,
        styles.errorMsg,
        styles.spanError,
        !validation.res,
        validation.msg
      );
      disableButton(["addActivity", "createActivities"], validation.res);
    }

    this.setState((previus) => {
      return {
        ...previus,
        activity: {
          ...previus.activity,
          [target.name]: value,
        },
      };
    });
  }
  handleStateChangeAddCountries(event) {
    let { target, keyCode } = event;
    if (keyCode === 13) {
      event.preventDefault();
      let country = {
        id: null,
      };
      this.props.countries.forEach((element) => {
        if (element.name === target.value.toLowerCase()) {
          country.id = element.id;
        }
      });
      if (country.id) {
        target.value = "";
        this.setState((previus) => {
          return {
            ...previus,
            countries: [...previus.countries, country.id],
          };
        });
      }
    }
  }
  deleteCountry(event, id) {
    event.preventDefault();
    this.setState((previus) => {
      return {
        ...previus,
        countries: previus.countries.filter((x) => x !== id),
      };
    });
  }
  deleteActivity(event, name) {
    event.preventDefault();
    this.setState((previus) => {
      return {
        ...previus,
        activities: previus.activities.filter((x) => x.activity.name !== name),
      };
    });
  }

  addActivity(event) {
    event.preventDefault();
    let msg,
      display = true;

    if (this.state.countries.length < 1) {
      msg = "Error. No countries added";
    } else {
      if (
        this.state.activity.name.length > 0 &&
        this.state.activity.duration >= 12
      ) {
        display = false;
        this.setState((previus) => {
          return {
            activity: {
              name: "",
              difficulty: 1,
              duration: 0,
              season: "summer",
            },
            countries: [],
            activities: [
              ...previus.activities,
              {
                activity: { ...previus.activity },
                countries: [...previus.countries],
              },
            ],
          };
        });
      } else {
        msg = "Error. Missing data entry";
      }
    }

    spanStyle(
      `error-msg-buttons`,
      styles.errorMsg,
      styles.spanError,
      display,
      msg
    );
    if (this.state.activities.length < 1) {
      disableButton(["createActivities"], !display);
    }
  }
  async createActivities(event) {
    event.preventDefault();
    let display = false;
    console.log("enviado");
    if (this.state.activities.length < 1) {
      display = true;
    } else {
      try {
        await postActivities(this.state.activities);
        this.setState((previus) => {
          return {
            ...previus,
            activities: [],
          };
        });
        divTime("msgSuccess", styles.msgAdded, styles.unmsgAdded);
      } catch (error) {
        console.log(error);
      }
    }

    spanStyle(
      `error-msg-buttons`,
      styles.errorMsg,
      styles.spanError,
      display,
      "Error. No activities have been added"
    );
  }
  render() {
    return (
      <div className={styles.createActivity}>
        <div className={styles.containerForm}>
          {/* Title of the form*/}
          <div className={styles.titleForm}>
            <h2>Create Activities</h2>
          </div>

          {/* Body of the form*/}
          <div className={styles.bodyForm}>
            <form className={styles.form} onSubmit={this.createActivities}>
              {/* name */}
              <div className={styles.inputsGroup}>
                <label htmlFor="name">Name </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={this.handleStateChange}
                  value={this.state.activity.name}
                  placeholder="example: swimming, basketball"
                  autoComplete="off"
                />
                <span id={"error-msg-name"} className={styles.spanError}>
                  error
                </span>
              </div>

              {/* difficulty */}
              <div className={styles.inputsGroup}>
                <label htmlFor="difficulty">Difficulty </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  onChange={this.handleStateChange}
                  value={this.state.activity.difficulty}
                >
                  <optgroup>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </optgroup>
                </select>
              </div>

              {/* duration */}
              <div className={styles.inputsGroup}>
                <label htmlFor="duration">Duration </label>
                <div className={styles.time}>
                  <input
                    type="text"
                    name="duration"
                    id="duration"
                    onChange={this.handleStateChange}
                    placeholder="example: 12 h - 3 weeks"
                    autoComplete="off"
                  />
                  <select
                    name="time"
                    id="time"
                    onChange={() => {
                      this.handleStateChange({
                        target: document.getElementById("duration"),
                      });
                    }}
                  >
                    <optgroup>
                      <option value="hours">hours</option>
                      <option value="days">days</option>
                      <option value="weeks">weeks</option>
                    </optgroup>
                  </select>
                </div>
                <span id="error-msg-duration" className={styles.spanError}>
                  error
                </span>
              </div>

              {/* season */}
              <div className={styles.inputsGroup}>
                <label htmlFor="season">Season </label>
                <select
                  name="season"
                  id="season"
                  onChange={this.handleStateChange}
                  value={this.state.activity.season}
                >
                  <optgroup>
                    <option value="summer">Summer</option>
                    <option value="autumn">Autumn</option>
                    <option value="winter">Winter</option>
                    <option value="spring">Spring</option>
                  </optgroup>
                </select>
              </div>

              {/* Search country to add */}
              <div className={styles.searchCountry}>
                <label htmlFor="country">Countries:</label>
                <input
                  id="country"
                  list="countries"
                  name="addCountries"
                  onKeyDown={this.handleStateChangeAddCountries}
                  placeholder="example: Colombia"
                />
                <datalist id="countries">
                  {this.props.countries.map((element, i) => (
                    <option key={i} value={element.name} />
                  ))}
                </datalist>
              </div>

              <div className={styles.buttons}>
                <span id="error-msg-buttons" className={styles.spanError}>
                  error
                </span>
                <button onClick={this.addActivity} id={"addActivity"}>
                  Add Activity
                </button>
                <button type="submit" id={"createActivities"}>
                  Create Activities
                </button>
              </div>
            </form>
          </div>

          {/*Countries added in the form */}
          <div className={styles.countriesForm}>
            {this.state.countries.map((element, i) => (
              <div className={styles.tag} key={i}>
                <label>
                  {searchName(element, this.props.countries)[0].name}
                </label>
                <button onClick={(event) => this.deleteCountry(event, element)}>
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* activities added to post */}
        <div className={styles.activitiesAdded}>
          <table className={styles.table}>
            <thead className={styles.theader}>
              <tr>
                <th>Name</th>
                <th>difficulty</th>
                <th>Duration</th>
                <th>Season</th>
                <th>Countries</th>
                <th></th>
              </tr>
            </thead>

            <tbody className={styles.tbody}>
              {this.state.activities && this.state.activities.length > 0 ? (
                this.state.activities.map((element, i) => (
                  <tr key={i}>
                    <td>{element.activity.name}</td>
                    <td>{element.activity.difficulty}</td>
                    <td>{element.activity.duration} h</td>
                    <td>{element.activity.season}</td>
                    <td>
                      <ul id={styles.listCountries}>
                        {element.countries.map((element, i) => (
                          <li key={i}>
                            {searchName(element, this.props.countries)[0].name}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td id={styles.deleteActivity}>
                      <button
                        onClick={(event) =>
                          this.deleteActivity(event, element.activity.name)
                        }
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Without Countries</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className={styles.unmsgAdded} id="msgSuccess">
            <img src={iconssuccess} alt="No Found" />
            <span>Activities Correctly added</span>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    countries: state.allCountries,
  };
}

export default connect(mapStateToProps)(CreateActivity);
//<a target="_blank" href="https://icons8.com/icon/63312/de-acuerdo">De acuerdo</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
