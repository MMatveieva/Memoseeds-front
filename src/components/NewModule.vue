<template>
  <div>
    <Header></Header>

    <!--Add my components-->

    <div>
      <form id="new_set_form" onsubmit="return false">
        <div class="container">
          <h2>Create new study set</h2>
          <div class="row" style="margin-bottom: 15px">
            <div class="col-sm-3">
              <input id="name" type="text" placeholder="Name..." required>
            </div>
            <div class="col-sm-3">
              <input id="category" type="text" placeholder="Category...">
            </div>
            <div class="col-sm-3" id="language_check_div">
              <span>Language</span>
              <!--<input type="checkbox" id="language_check" value="language_check" v-on:click="language_check">-->
              <div id="language_checkbox" v-on:click="language_check">
                <div id="language_check_sign">&#10003;</div>
              </div>
            </div>
            <div class="col-sm-3">
              <button id="create_btn" v-on:click="btnClick">CREATE</button>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-3">
              <input id="subject" type="text" placeholder="Subject...">
            </div>
            <div class="col-sm-3 row" id="public_check_div">

              <div class="col-sm-6">
                <span>Public</span>
                <!--<input type="checkbox" id="public_check" v-on:click="public_check" value="public_check">-->
                <div id="public_checkbox" v-on:click="public_check">
                  <div id="public_check_sign">&#10003;</div>
                </div>
              </div>

              <div class="col-sm-6">
                <input id="price" type="number" placeholder="Price..." disabled><span
                style="display: inline-block; float: right">$</span>
              </div>

            </div>
            <div class="col-sm-5 row">
              <div class="col-sm-5" style="padding-right: 0">
                <select id="lang1" disabled>
                  <option value="sq">Albanian</option>
                  <option value="ar">Arabic</option>
                  <option value="hy">Armenian</option>
                  <option value="az">Azerbaijani</option>
                  <option value="eu">Basque</option>
                  <option value="be">Belarusian</option>
                  <option value="bn">Bengali</option>
                  <option value="zh">Chinese</option>
                  <option value="hr">Croatian</option>
                  <option value="cs">Czech</option>
                  <option value="da">Danish</option>
                  <option value="nl">Dutch</option>
                  <option value="en" selected>English</option>
                  <option value="eo">Esperanto</option>
                  <option value="et">Estonian</option>
                  <option value="tl">Filipino</option>
                  <option value="tl">Filipino</option>
                  <option value="gl">Galician</option>
                  <option value="de">German</option>
                  <option value="ka">Georgian</option>
                  <option value="el">Greek</option>
                  <option value="hu">Hungarian</option>
                  <option value="id">Indonesian</option>
                  <option value="it">Italian</option>
                  <option value="la">Latin</option>
                  <option value="no">Norwegian</option>
                  <option value="ru">Russian</option>
                  <option value="sl">Slovenian</option>
                  <option value="es">Spanish</option>
                  <option value="sw">Swahili</option>
                  <option value="sv">Swedish</option>
                  <option value="th">Thai</option>
                  <option value="tr">Turkish</option>
                  <option value="uk">Ukrainian</option>
                  <option value="vi">Vietnamese</option>
                  <option value="cy">Welsh</option>
                </select>
              </div>
              <div class="col-sm-2" id="language_switch_div">
                <img v-on:click="switchLanguages" id="language_switch_img" src="/src/css/images/switch.svg">
              </div>
              <div class="col-sm-5" style="padding-left: 0">
                <select id="lang2" disabled>
                  <option value="sq">Albanian</option>
                  <option value="ar">Arabic</option>
                  <option value="hy">Armenian</option>
                  <option value="az">Azerbaijani</option>
                  <option value="eu">Basque</option>
                  <option value="be">Belarusian</option>
                  <option value="bn">Bengali</option>
                  <option value="zh">Chinese</option>
                  <option value="hr">Croatian</option>
                  <option value="cs">Czech</option>
                  <option value="da">Danish</option>
                  <option value="nl">Dutch</option>
                  <option value="en">English</option>
                  <option value="eo">Esperanto</option>
                  <option value="et">Estonian</option>
                  <option value="tl">Filipino</option>
                  <option value="tl">Filipino</option>
                  <option value="gl">Galician</option>
                  <option value="de">German</option>
                  <option value="ka">Georgian</option>
                  <option value="el">Greek</option>
                  <option value="hu">Hungarian</option>
                  <option value="id">Indonesian</option>
                  <option value="it">Italian</option>
                  <option value="la">Latin</option>
                  <option value="no">Norwegian</option>
                  <option value="ru">Russian</option>
                  <option value="sl">Slovenian</option>
                  <option value="es">Spanish</option>
                  <option value="sw">Swahili</option>
                  <option value="sv">Swedish</option>
                  <option value="th">Thai</option>
                  <option value="tr">Turkish</option>
                  <option value="uk" selected>Ukrainian</option>
                  <option value="vi">Vietnamese</option>
                  <option value="cy">Welsh</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div id="words">
            <!--filling by for each loop-->
            <div class="row newword_div">
              <div class="col-sm-6"><span class="word_index_1">1. </span><input v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_1"
                                                                                style="width: 70%"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6">
                <input type="text" class="translate_input" id="translate_1" style="width: 70%"
                       placeholder="Enter translation or definition">
                <span id="t_e_span_1" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                  <input type="text" id="translate_example_1" class="translate_example"
                         style="cursor: pointer;width: 70%;margin-top:5px;">
                </span>
              </div>
            </div>
            <div class="row newword_div">
              <div class="col-sm-6"><span class="word_index_2">2. </span><input v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_2"
                                                                                style="width: 70%"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6">
                <input type="text" class="translate_input" id="translate_2" style="width: 70%"
                       placeholder="Enter translation or definition">
                <span id="t_e_span_2" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                <input type="text" id="translate_example_2" class="translate_example"
                       style="cursor: pointer;width: 70%;margin-top:5px;">
              </span>
              </div>
            </div>
            <div class="row newword_div">
              <div class="col-sm-6"><span class="word_index_3">3. </span><input v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_3"
                                                                                style="width: 70%"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6"><input type="text" class="translate_input" id="translate_3" style="width: 70%"
                                           placeholder="Enter translation or definition">
                <span id="t_e_span_3" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                <input type="text" id="translate_example_3" class="translate_example"
                       style="cursor: pointer;width: 70%;margin-top:5px;">
              </span>
              </div>
            </div>
            <div class="row newword_div">
              <div class="col-sm-6"><span class="word_index_4">4. </span><input v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_4"
                                                                                style="width: 70%"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6"><input type="text" class="translate_input" id="translate_4" style="width: 70%"
                                           placeholder="Enter translation or definition">
                <span id="t_e_span_4" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                <input type="text" id="translate_example_4" class="translate_example"
                       style="cursor: pointer;width: 70%;margin-top:5px;">
              </span>
              </div>
            </div>
            <div class="row newword_div">
              <div class="col-sm-6"><span class="word_index_5">5. </span><input v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_5"
                                                                                style="width: 70%"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6"><input type="text" class="translate_input" id="translate_5" style="width: 70%"
                                           placeholder="Enter translation or definition">
                <span id="t_e_span_5" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                <input type="text" id="translate_example_5" class="translate_example"
                       style="cursor: pointer;width: 70%;margin-top:5px;">
              </span>
              </div>
            </div>
            <div class="row newword_div">
              <div class="col-sm-6"><span class="word_index_6">6. </span><input v-on:keyup='asynctranslation'
                                                                                type="text"
                                                                                class="word_input" id="word_6"
                                                                                style="width: 70%"
                                                                                placeholder="Enter a word or term">
              </div>
              <div class="col-sm-6"><input type="text" class="translate_input" id="translate_6" style="width: 70%"
                                           placeholder="Enter translation or definition">
                <span id="t_e_span_6" class="t_e_span" v-on:click="setTranslation" style="cursor: pointer">
                <input type="text" v-on:click="setTranslation" id="translate_example_6" class="translate_example"
                       style="cursor: pointer;width: 70%;margin-top:5px;">
              </span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="offset-4 col-sm-3">
              <!--<button class="" id="addmore_btn" v-on:click="btnClick">Add more</button>-->
            </div>
          </div>
        </div>
      </form>
    </div>

    <!--My last edits adding-->

    <div class="card-footer footer">
      MEMOSEEDS INC., ALL RIGHTS RESERVED
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Header from './Header'

  var index = 7;

  export default {
    name: "NewSet",
    components: {Header},
    data() {
      return {
        filter: {}
      }
    },
    methods: {
      created: function () {
        this.getFilter();
      },
      getFilter: function () {
        axios.get('https://cors-anywhere.herokuapp.com/https://memeseeds.herokuapp.com/shop/subjects/categories')
          .then(response => {
            this.filter = response.data;
            for (var key in Object.keys(filter)) {
              console.log(key);
            }


          })
          .catch(error => {
            alert("Error occurred during loading modules. Please try again");
          });
      },
      btnClick: function () {
        // this.fillWords();
        console.log(this.filter);
        for (var key in Object.keys(filter)) {
          console.log(key);
        }
      },
      btncreateClick: function () {
        console.log('send data');
        //collect all data from form
        var name = document.getElementById('name').value;
        var subject = document.getElementById('subject').value;
        var category = document.getElementById('category').value;
        var data = {
          "name": name,
          "category": category,
          "subject": subject
        };

        //if user marked public checked and wrote price then also add it to the form

        var public_checkbox = document.getElementById("public_check_sign");
        var public_checkbox_visibility_status = window.getComputedStyle(public_checkbox).getPropertyValue('visibility');
        var price = document.getElementById("price").value;
        if (public_checkbox_visibility_status == "visible" && price != "") {
          data['price'] = price;
        }

        console.log(data);

        let config = {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        };
        // var data = ;
        // axios.post('https://memeseeds.herokuapp.com/createSet', data, config)
        //   .then(response => {
        //     console.log(response.data)
        //   })
        //   .catch(error => {
        //     console.log(error)
        //   });
      },
      fillWords: function () {
        var last_index = index + 5;
        var line = '';
        for (; index <= last_index; index++) {
          line += "<div class=\"row newword_div\">";
          line += "<div class=\"col-sm-6\">";
          line += "<span class=\"word_index_" + index + "\">" + index + ". </span>";
          line += "<input v-on:keyup='getTranslations' type=\"text\" class='word_input' id=\"word_" + index + "\" style=\"width: 70%\" placeholder=\"Enter word or term\"></div>";
          line += "<div class=\"col-sm-6\">";
          line += "<input type=\"text\" class='translate_input' id=\"translate_" + index + "\" style=\"width: 70%\" placeholder=\"Enter translation or definition\">";
          line += "</div>";
          line += "</div>";
        }

        var div = document.getElementById('words');
        div.insertAdjacentHTML('beforeend', line);
      },
      asynctranslation: function (evt) {
        var language_checkbox = document.getElementById("language_check_sign");
        var language_checkbox_visibility_status = window.getComputedStyle(language_checkbox).getPropertyValue('visibility');
        if (language_checkbox_visibility_status == "visible") {
          this.inputkeyUp(evt);
        }
      },
      inputkeyUp: function (evt) {
        // sending word for translation
        var typed_div = evt.target.id;
        var typed_div_number = typed_div[typed_div.length - 1];
        //text for translation
        var souceText = document.getElementById("" + typed_div + "").value;
        //getting short value and full name of source language
        var sourceLanguageValue = document.getElementById('lang1').value;
        var sourceLanguage_fullName = document.getElementById('lang1').selectedOptions[0].text;
        //getting short value and full name of Target language
        var targetLanguageValue = document.getElementById('lang2').value;
        var targetLanguage_fullName = document.getElementById('lang2').selectedOptions[0].text;


        if (souceText != "") {

          //send on server
          let config = {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          };

          var data = {
            "SourceText": souceText,
            "SourceLanguage": sourceLanguage_fullName,
            "TargetLanguage": targetLanguage_fullName
          };

          axios.post('https://cors-anywhere.herokuapp.com/https://memeseeds.herokuapp.com/translate', data, config)
            .then(response => {
              var translation = response.data;
              if (translation != "") {
                var element = document.getElementById("translate_example_" + typed_div_number + "");
                element.value = translation;
                element.style.display = "block";
              } else {
                //send via js
                console.log('sending for translation via js');
                var link = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + sourceLanguageValue +
                  '&tl=' + targetLanguageValue + '&dt=t&q=' + souceText;
                axios.post(link)
                  .then(response => {
                    var translation = response.data[0][0][0];

                    var element = document.getElementById("translate_example_" + typed_div_number + "");
                    element.value = translation;
                    element.style.display = "block";
                  })
                  .catch(error => {
                    console.log(error)
                  });

              }
            })
            .catch(error => {
              console.log(error)
            });

        } else {
          var element = document.getElementById("translate_example_" + typed_div_number + "");
          element.style.display = "none";
        }

      },
      setTranslation: function (evt) {
        var typed_div = evt.target.id;
        var typed_div_number = typed_div[typed_div.length - 1];

        var translate_example_element = document.getElementById("translate_example_" + typed_div_number + "");
        var translation = translate_example_element.value;

        var translate_field = document.getElementById("translate_" + typed_div_number + "");
        translate_field.value = translation;

        translate_example_element.style.display = "none";
      },
      switchLanguages: function () {
        //get values of selected languages
        var lang1 = document.getElementById("lang1");
        var value1 = lang1.options[lang1.selectedIndex].value;

        var lang2 = document.getElementById("lang2");
        var value2 = lang2.options[lang2.selectedIndex].value;

        lang1.value = value2;
        lang2.value = value1;
      },
      public_check: function () {

        var public_checkbox = document.getElementById("public_check_sign");
        var public_checkbox_visibility_status = window.getComputedStyle(public_checkbox).getPropertyValue('visibility');
        if (public_checkbox_visibility_status == "visible") {
          public_checkbox.style.visibility = "hidden";
          document.getElementById("price").setAttribute('disabled', 'disabled');

          document.getElementById("category").removeAttribute('required');
          document.getElementById("subject").removeAttribute('required');
        } else {
          public_checkbox.style.visibility = "visible";

          document.getElementById("price").removeAttribute('disabled');
          document.getElementById("category").setAttribute('required', 'required');
          document.getElementById("subject").setAttribute('required', 'required');
        }
      },
      language_check: function () {
        var language_checkbox = document.getElementById("language_check_sign");
        var language_checkbox_visibility_status = window.getComputedStyle(language_checkbox).getPropertyValue('visibility');
        if (language_checkbox_visibility_status == "visible") {
          language_checkbox.style.visibility = "hidden";
          document.getElementById("lang1").setAttribute('disabled', 'disabled');
          document.getElementById("lang2").setAttribute('disabled', 'disabled');
        } else {
          language_checkbox.style.visibility = "visible";
          document.getElementById("lang1").removeAttribute('disabled');
          document.getElementById("lang2").removeAttribute('disabled')
        }
      }
    }
  }

</script>

<style>
  #public_checkbox {
    cursor: pointer;
    position: absolute;
    margin-top: 5px;
    margin-left: 5px;
    display: inline-block;
    background: white;
    height: 1.2vw;
    width: 1.2vw;
  }

  #public_checkbox:hover {
    background: #ffdede;
  }

  #public_checkbox:active {
    background: #7e7e8d61;
  }

  #public_check_sign {
    cursor: pointer;
    visibility: hidden;
    font-size: 160%;
    padding: 0;
    margin-top: -15px;
  }

  #language_checkbox {
    cursor: pointer;
    position: absolute;
    margin-top: 5px;
    margin-left: 5px;
    display: inline-block;
    background: white;
    height: 1.2vw;
    width: 1.2vw;
  }

  #language_checkbox:hover {
    background: #ffdede;
  }

  #language_checkbox:active {
    background: #7e7e8d61;
  }

  #language_check_sign {
    cursor: pointer;
    visibility: hidden;
    font-size: 160%;
    padding: 0;
    margin-top: -15px;
  }

  #words {
    margin-top: 50px;
  }

  #name {
    width: 90%;
    border-color: transparent;
  }

  #category {
    width: 90%;
    border-color: transparent;
  }

  #create_btn {
    cursor: pointer;
    width: 100%;
    border: none;
    background: #1894a5;
    color: white;
    border-radius: 15px;
  }

  #create_btn:active {
    background: #12496d;
  }

  #addmore_btn {
    border: none;
    width: 80%;
    background: #1894a5;
    color: white;
    border-radius: 15px;
  }

  .word_input {
    border-color: transparent;
  }

  .translate_input {
    border-color: transparent;
  }

  .translate_example {
    background: antiquewhite;
    display: none;
    pointer-events: none;
    border: transparent;
  }


  .newword_div {
    margin-bottom: 15px;
  }

  #lang1 {
    height: 100%;
    width: 100%;
    border-color: transparent;
  }

  #lang2 {
    height: 100%;
    width: 100%;
    border-color: transparent;
  }

  #language_switch_div {
    padding-right: 0;
    padding-left: 0;

  }

  #language_switch_img {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition-property: transform;
    transition-duration: 0.1s;
  }

  #language_switch_img:active {
    transform: rotate(180deg);
  }

  #subject {
    width: 90%;
    border-color: transparent;
  }

  #price {
    border: transparent;
    display: inline-block;
    width: 80%;
  }

  #price::-webkit-inner-spin-button,
  #price::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  #language_check_div {
    font-size: 20px;
  }

  #public_check_div {
    font-size: 20px;
  }

  @media all and (min-width: 769px) and (max-width: 1024px) {
    #public_checkbox {
      width: 2vw;
      height: 2vw;
    }

    #language_checkbox {
      width: 2vw;
      height: 2vw;
    }

    #price {
      width: 85%;
      font-size: 20px;
    }
  }

  @media all and (max-width: 768px) {
    #public_checkbox {
      width: 2vw;
      display: inline-block;
      height: 2vw;
    }

    #language_checkbox {
      width: 2vw;
      height: 2vw;
    }

    #price {
      width: 10px;
      font-size: 20px;
    }
  }


  /***********************************************/

  .footer {
    text-align: center;
    background-color: #bebfc0;
    color: white;
    letter-spacing: 5px;
    position: absolute;
    width: 100%;
    bottom: 0;
  }

  .hidden {
    display: none;
  }

</style>
