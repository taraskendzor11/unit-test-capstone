const unitTestingTask = require("./unitTestingTask");

const currentDate = new Date(1665563815679);

const expectedLangResults = {
  be: {
    id: require("./lang/be"),
    MMMM: "кастрычнік",
    MMM: "кас",
    MM: "10",
    M: "10",
    DDD: "серада",
    DD: "сер",
    D: "сер",
    A: "раніцы",
    a: "раніцы",
  },
  cs: {
    id: require("./lang/cs"),
    MMMM: "listopad",
    MMM: "říj",
    MM: "10",
    M: "10",
    DDD: "středa",
    DD: "stř",
    D: "stř",
    A: "dopoledne",
    a: "dopoledne",
  },
  kk: {
    id: require("./lang/kk"),
    MMMM: "қазан",
    MMM: "қаз",
    MM: "10",
    M: "10",
    DDD: "сәрсенбі",
    DD: "ср",
    D: "ср",
  },
  pl: {
    id: require("./lang/pl"),
    MMMM: "październik",
    MMM: "paź",
    MM: "10",
    M: "10",
    DDD: "środa",
    DD: "śr",
    D: "Śr",
    A: "rano",
    a: "rano",
  },
  ru: {
    id: require("./lang/ru"),
    MMMM: "октябрь",
    MMM: "окт",
    MM: "10",
    M: "10",
    DDD: "среда",
    DD: "ср",
    D: "ср",
    A: "утра",
    a: "утра",
  },
  tr: {
    id: require("./lang/tr"),
    MMMM: "Ekim",
    MMM: "Eki",
    MM: "10",
    M: "10",
    DDD: "Çarşamba",
    DD: "Çar",
    D: "Ça",
  },
  tt: {
    id: require("./lang/tt"),
    MMMM: "октябрь",
    MMM: "окт",
    MM: "10",
    M: "10",
    DDD: "чәршәмбе",
    DD: "чш",
    D: "чш",
  },
  uk: {
    id: require("./lang/uk"),
    MMMM: "жовтень",
    MMM: "жовт",
    MM: "10",
    M: "10",
    DDD: "середа",
    DD: "ср",
    D: "ср",
    A: "ранку",
    a: "ранку",
  },
};

describe("test error about wrong format", () => {
  const language = Object.keys(expectedLangResults)[0];

  beforeAll(() =>
    unitTestingTask.lang(`${language}`, expectedLangResults[language].id)
  );

  it(`should show error about wrong format`, () => {
    expect(unitTestingTask).toThrowError("Argument `format` must be a string");
  });
});

describe("test with using different languages", () => {
  Object.keys(expectedLangResults).forEach((key) => {
    const currentLanguage = key;

    describe(`use ${currentLanguage} language`, () => {
      beforeAll(() =>
        unitTestingTask.lang(
          `${currentLanguage}`,
          expectedLangResults[currentLanguage].id
        )
      );

      it(`should show full name of month on ${currentLanguage} language`, () => {
        expect(unitTestingTask("MMMM", currentDate)).toBe(
          expectedLangResults[currentLanguage].MMMM
        );
      });

      it(`should show short name of month on ${currentLanguage} language`, () => {
        expect(unitTestingTask("MMM", currentDate)).toBe(
          expectedLangResults[currentLanguage].MMM
        );
      });
      it(`should show short name of month on ${currentLanguage} language`, () => {
        expect(unitTestingTask("MM", currentDate)).toBe(
          expectedLangResults[currentLanguage].MM
        );
      });

      it(`should show number of month in year without zero-padding on ${currentLanguage} language`, () => {
        expect(unitTestingTask("M", currentDate)).toBe(
          expectedLangResults[currentLanguage].M
        );
      });

      it(`should show full name of day on ${currentLanguage} language`, () => {
        expect(unitTestingTask("DDD", currentDate)).toBe(
          expectedLangResults[currentLanguage].DDD
        );
      });

      it(`should show short name of day on ${currentLanguage} language`, () => {
        expect(unitTestingTask("DD", currentDate)).toBe(
          expectedLangResults[currentLanguage].DD
        );
      });
      it(`should show min name of day on ${currentLanguage} language`, () => {
        expect(unitTestingTask("D", currentDate)).toBe(
          expectedLangResults[currentLanguage].D
        );
      });
      it(`should catch the error - argument date must be instance of Date`, () => {
        try {
          unitTestingTask("DD", []);
        } catch ({ message }) {
          expect(message).toBe(
            "Argument `date` must be instance of Date or Unix Timestamp or ISODate String"
          );
        }
        expect.assertions(1);
      });
      it("formatters function returns array", () => {
        expect(Array.isArray(unitTestingTask.formatters())).toBeTruthy();
      });
      
      it("noConflict return value should be equal the unitTestingTask", () => {
        expect(unitTestingTask.noConflict()).toEqual(unitTestingTask);
      });

   
      if (expectedLangResults[key].A) {
        it(`should show AM/PM for time less than 12`, () => {
          expect(unitTestingTask("A", currentDate)).toBe(
            `${expectedLangResults[currentLanguage].A}`
          );
        });
      }

      if (expectedLangResults[key].a) {
        it(`should show am/pm for time less than 12`, () => {
          expect(unitTestingTask("a", currentDate)).toBe(
            `${expectedLangResults[currentLanguage].a}`
          );
        });
      }
    });
  });
});

const currentDateWithLaterTime = new Date(1665571886004);

const expectedResult = {
  cs: {
    id: require("./lang/be"),
    YYYY: "2022",
    YY: "22",
    dd: "12",
    d: "12",
    HH: "13",
    H: "13",
    hh: "01",
    h: "1",
    mm: "51",
    m: "51",
    ss: "26",
    s: "26",
    ff: "004",
    f: "4",
    ZZ: "+0300",
    Z: "+03:00",
  },
};

describe(`test other cases`, () => {
  const currentLanguage = Object.keys(expectedResult)[0];

  beforeAll(() =>
    unitTestingTask.lang(
      `${currentLanguage}`,
      expectedResult[currentLanguage].id
    )
  );

  it(`should show 4-digit year`, () => {
    expect(unitTestingTask("YYYY", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].YYYY
    );
  });

  it(`should show last 2 digit of year`, () => {
    expect(unitTestingTask("YY", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].YY
    );
  });

  it(`should show zero-padded number of day in month`, () => {
    expect(unitTestingTask("dd", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].dd
    );
  });

  it(`should show number of day in month`, () => {
    expect(unitTestingTask("d", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].d
    );
  });

  it(`should show zero-padded hour in 24-hr format`, () => {
    expect(unitTestingTask("HH", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].HH
    );
  });

  it(`should show hour in 24-hr format`, () => {
    expect(unitTestingTask("H", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].H
    );
  });

  it(`should show zero-padded hour in 12-hr format`, () => {
    expect(unitTestingTask("hh", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].hh
    );
  });

  it(`should show hour in 12-hr format`, () => {
    expect(unitTestingTask("h", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].h
    );
  });

  it(`should show zero-padded minutes`, () => {
    expect(unitTestingTask("mm", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].m
    );
  });

  it(`should show minutes`, () => {
    expect(unitTestingTask("m", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].m
    );
  });

  it(`should show zero-padded seconds`, () => {
    expect(unitTestingTask("ss", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].ss
    );
  });

  it(`should show seconds`, () => {
    expect(unitTestingTask("s", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].s
    );
  });

  it(`should show zero-padded milliseconds`, () => {
    expect(unitTestingTask("ff", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].ff
    );
  });

  it(`should show milliseconds`, () => {
    expect(unitTestingTask("f", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].f
    );
  });

  it(`should show time-zone in ISO8601-compatible basic format`, () => {
    expect(unitTestingTask("ZZ", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].ZZ
    );
  });

  it(`should show time-zone in ISO8601-compatible extended format`, () => {
    expect(unitTestingTask("Z", currentDateWithLaterTime)).toBe(
      expectedResult[currentLanguage].Z
    );
  });
  it('should returns date from predefined formatters storage', () => {
    unitTestingTask._formatters = {
      YYYY: function () {
        return 'formatted date';
      }
    };
    const format = 'YYYY';
    const formattedDate = unitTestingTask(format, currentDate);
    expect(formattedDate).toEqual(unitTestingTask._formatters[format](currentDate));
  });
});

const nightTime = new Date(1665535886000);

const expectedEarlyTimeResults = {
  be: {
    A: "ночы",
    a: "ночы",
  },
  ru: {
    A: "ночи",
    a: "ночи",
  },
  uk: {
    A: "ночі",
    a: "ночі",
  },
};

describe("test meridiem for time less than 4 AM", () => {
  Object.keys(expectedEarlyTimeResults).forEach((key) => {
    const currentLanguage = key;

    describe(`test for ${currentLanguage} language`, () => {
      beforeAll(() =>
        unitTestingTask.lang(
          `${currentLanguage}`,
          expectedEarlyTimeResults[currentLanguage].id
        )
      );

      it(`should show AM or PM for time less than 4`, () => {
        expect(unitTestingTask("A", nightTime)).toBe(
          `${expectedEarlyTimeResults[currentLanguage].A}`
        );
      });

      it(`should show am or pm for time less than 4`, () => {
        expect(unitTestingTask("a", nightTime)).toBe(
          `${expectedEarlyTimeResults[currentLanguage].a}`
        );
      });
    });
  });
});

const dayTime = new Date(1665582686000);

const expectedDayTimeResults = {
  be: {
    A: "дня",
    a: "дня",
  },
  ru: {
    A: "дня",
    a: "дня",
  },
  uk: {
    A: "дня",
    a: "дня",
  },
};

describe("test meridiem for time less than 17", () => {
  Object.keys(expectedDayTimeResults).forEach((key) => {
    const currentLanguage = key;

    describe(`test for ${currentLanguage} language`, () => {
      beforeAll(() =>
        unitTestingTask.lang(
          `${currentLanguage}`,
          expectedDayTimeResults[currentLanguage].id
        )
      );

      it(`should show AM or PM for time less than 17`, () => {
        expect(unitTestingTask("A", dayTime)).toBe(
          `${expectedDayTimeResults[currentLanguage].A}`
        );
      });

      it(`should show am or pm for time less than 17`, () => {
        expect(unitTestingTask("a", dayTime)).toBe(
          `${expectedDayTimeResults[currentLanguage].a}`
        );
      });
    });
  });
});

const eveningTime = new Date(1665593486000);

const expectedEveningTimeResults = {
  be: {
    A: "вечара",
    a: "вечара",
  },
  cs: {
    A: "odpoledne",
    a: "odpoledne",
  },
  pl: {
    A: "",
    a: "",
  },
  ru: {
    A: "вечера",
    a: "вечера",
  },
  uk: {
    A: "вечора",
    a: "вечора",
  },
};

describe("test meridiem for time more than 17", () => {
  Object.keys(expectedEveningTimeResults).forEach((key) => {
    const currentLanguage = key;

    describe(`test for ${currentLanguage} language`, () => {
      beforeAll(() =>
        unitTestingTask.lang(
          `${currentLanguage}`,
          expectedEveningTimeResults[currentLanguage].id
        )
      );

      it(`should show AM or PM for time more than 17`, () => {
        expect(unitTestingTask("A", eveningTime)).toBe(
          `${expectedEveningTimeResults[currentLanguage].A}`
        );
      });

      it(`should show am or pm for time more than 17`, () => {
        expect(unitTestingTask("a", eveningTime)).toBe(
          `${expectedEveningTimeResults[currentLanguage].a}`
        );
      });
    });
  });
});








