// //Chua xong
// describe('Test 01: Check display ', () => {
// it('should render login form correctly', () => {
//   cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');

//   //Check display
//   cy.get("label[for='username-login']").should('be.visible').and('contain.text', 'Username');
//   cy.get("label[for='password-login']").should('be.visible').and('contain.text', 'Password');
//   cy.get('form').should('exist').and('contain.text', 'LOGIN');

//   cy.contains('span','TOKYO SEIMITSU CO., LTD.').should('be.visible')
//   cy.contains('em','Select username').click()
//   //Thieu veryfy droplist




// }); 
// it.only('Test droplist',()=>{
//   cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com/')
//   cy.contains('em','Select username').click() // Chọn phần tử <li>
//   cy.get("ul[role='listbox']").find('li').then(allData=>{
//     cy.wrap('').then(()=>{
//       expect()
//     })
//   })

//   it.only('test intercept',()=>{
//     cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com/')
//     cy.intercept("https://cloud-accretech.link/acct/1/server/resource/100/dev/auth/users").as('users')
//     cy. wait('@users')
//     cy.get('@users').then(users=>{
//     let items=users.response.body.value
//     var usersData=items.map(item=>{
//       return {
//         itemUserName: item.user
//       }
//     })
//     cy.log(usersData);
//   })
//   cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com/')
//   cy.contains('em','Select username').click() // Chọn phần tử <li>
//   cy.get("ul[role='listbox']").find('li').then(allData=>{
//     cy.wrap('').then(()=>{
//       expect()
//     })
//   })
//   }
// )



// })
describe('Test intercept and modify data', () => {
  it.only('modify API response and verify on UI', () => {
    // Truy cập trang web
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com/');

    // Thực hiện intercept để thay đổi dữ liệu trả về từ API
    cy.intercept('GET', 'https://cloud-accretech.link/acct/1/server/resource/100/dev/auth/users', {
      statusCode: 200,
      body: {
        value: [
          {
            "user": "operator2",
            "userId": 1
          },
          {
            "user": "maintainer2",
            "userId": 2
          },
          {
            "user": "engineer3",
            "userId": 3
          },
          {
            "user": "admin3",
            "userId": 4
          },
          {
            "user": "accretech3",
            "userId": 5
          }
        ]
      }
    }).as('users');

    // Chờ API trả về dữ liệu đã được thay đổi
    cy.wait('@users').then((interception) => {
      const items = interception.response.body.value; // Lấy dữ liệu đã thay đổi
      const apiUserNames = items.map(item => item.user); // Tạo mảng tên người dùng từ API

      // Bước 4: Lấy danh sách tên người dùng từ giao diện
      cy.contains('em', 'Select username').click();  // Chọn phần tử <em> chứa "Select username"
      cy.get('ul[role="listbox"]').find('li')  // Lấy danh sách các phần tử <li> trong ul
        .each((li, index) => {
          cy.wrap(li).invoke('text').then((text) => {
            // So sánh tên người dùng trên giao diện với dữ liệu từ API đã thay đổi
            expect(apiUserNames[index]).to.equal(text.trim());
          });
        });

      // Bước 5: Kiểm tra rằng dữ liệu từ API và UI có cùng số lượng người dùng
      expect(apiUserNames.length).to.equal(items.length);
    });
  });
});


describe('Test', () => {
  it('test intercept and compare with UI', () => {
    // Bước 1: Truy cập trang web
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com/');

    // Bước 2: Intercept API và đặt alias cho phản hồi
    cy.intercept("https://cloud-accretech.link/acct/1/server/resource/100/dev/auth/users").as('users');

    // Bước 3: Chờ API trả về dữ liệu
    cy.wait('@users').then((interception) => {
      // Lấy dữ liệu từ phản hồi API
      const items = interception.response.body.value;

      // Map dữ liệu API để lấy danh sách người dùng
      const apiUserNames = items.map(item => item.user);

      cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com/');
      //Bước 4: Lấy danh sách tên người dùng từ giao diện
      cy.contains('em', 'Select username').click()
      cy.get('ul[role="listbox"]')  // Lấy danh sách các phần tử trong ul
        .find('li')  // Tìm tất cả các phần tử <li>
        .each((li, index) => {
          // So sánh tên người dùng từ giao diện với dữ liệu từ API
          cy.wrap(li).invoke('text').then((text) => {
            // Kiểm tra xem tên người dùng trên giao diện có khớp với tên người dùng từ API không
            expect(apiUserNames[index]).to.equal(text.trim());
          });
        });

      // Bước 5: Kiểm tra thêm nếu cần
      // Ví dụ: Kiểm tra rằng dữ liệu từ API và UI có cùng số lượng người dùng
      expect(apiUserNames.length).to.equal(items.length);
    });
  });

})

describe('Test 02: Login page success with account engineer ', () => {
  it('should render login form correctly', () => {
    let account = "engineer";
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');


    cy.contains('em', 'Select username').click()
    cy.get(`li[data-value='${account}']`).click()

    //Check keyboard
    let arr = account.split('');

    cy.get('[data-testid="keyboardTestId"]').within(() => {
      cy.wrap(arr).each((key) => {
        cy.get('button').contains(key).click();
      });
    });

    //Check button OK
    cy.get('form').should('exist').and('contain.text', 'LOGIN');
    cy.contains('button', 'OK').click()

    //Check success
    cy.get('div').contains('CEM Monitoring').should('be.visible')
  });
});

describe('Test 03: Login page success with account operator ', () => {
  it('should render login form correctly', () => {
    let account = "operator";
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');

    cy.contains('em', 'Select username').click()
    cy.get(`li[data-value='${account}']`).click()

    //Check keyboard
    let arr = account.split('');

    cy.get('[data-testid="keyboardTestId"]').within(() => {
      cy.wrap(arr).each((key) => {
        cy.get('button').contains(key).click();
      });
    });

    //Check button OK
    cy.get('form').should('exist').and('contain.text', 'LOGIN');
    cy.contains('button', 'OK').click()

    //Check success
    cy.get('div').contains('CEM Monitoring').should('be.visible')
  });
});

describe('Test 04: Login page success with account maintainer ', () => {
  it('should render login form correctly', () => {
    let account = "maintainer";
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');

    cy.contains('em', 'Select username').click()
    cy.get(`li[data-value='${account}']`).click()

    //Check keyboard
    let arr = account.split('');

    cy.get('[data-testid="keyboardTestId"]').within(() => {
      cy.wrap(arr).each((key) => {
        cy.get('button').contains(key).click();
      });
    });

    //Check button OK
    cy.get('form').should('exist').and('contain.text', 'LOGIN');
    cy.contains('button', 'OK').click()

    //Check success
    cy.get('div').contains('CEM Monitoring').should('be.visible')
  });
});

describe('Test 05: Login page success with account engineer ', () => {
  it('should render login form correctly', () => {
    let account = "engineer";
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');

    cy.contains('em', 'Select username').click()
    cy.get(`li[data-value='${account}']`).click()

    //Check keyboard
    let arr = account.split('');

    cy.get('[data-testid="keyboardTestId"]').within(() => {
      cy.wrap(arr).each((key) => {
        cy.get('button').contains(key).click();
      });
    });

    //Check button OK
    cy.get('form').should('exist').and('contain.text', 'LOGIN');
    cy.contains('button', 'OK').click()

    //Check success
    cy.get('div').contains('CEM Monitoring').should('be.visible')
  });
});

describe('Test 06: Login page success with account admin ', () => {
  it('should render login form correctly', () => {
    let account = "admin";
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');

    cy.contains('em', 'Select username').click()
    cy.get(`li[data-value='${account}']`).click()

    //Check keyboard
    let arr = account.split('');

    cy.get('[data-testid="keyboardTestId"]').within(() => {
      cy.wrap(arr).each((key) => {
        cy.get('button').contains(key).click();
      });
    });

    //Check button OK
    cy.get('form').should('exist').and('contain.text', 'LOGIN');
    cy.contains('button', 'OK').click()

    //Check success
    cy.get('div').contains('CEM Monitoring').should('be.visible')
  });
});

describe('Test 07: Login page success with account accretech ', () => {
  it('should render login form correctly', () => {
    let account = "accretech";
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');

    cy.contains('em', 'Select username').click()
    cy.get(`li[data-value='${account}']`).click()

    //Check keyboard
    let arr = account.split('');

    cy.get('[data-testid="keyboardTestId"]').within(() => {
      cy.wrap(arr).each((key) => {
        cy.get('button').contains(key).click();
      });
    });

    //Check button OK
    cy.get('form').should('exist').and('contain.text', 'LOGIN');
    cy.contains('button', 'OK').click()

    //Check success
    cy.get('div').contains('CEM Monitoring').should('be.visible')
  });
});


describe('Test 08: Login page success with all blank ', () => {
  it('should render login form correctly', () => {
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');
    //Click button ok

    cy.contains('button', 'LOGIN').click()

    //Ô username hiện viền màu đỏ
    cy.get('em') // Thay 'selector' bằng selector của phần tử bạn muốn kiểm tra
      .should('have.css', 'border-color', 'rgb(193, 193, 193)'); // Kiểm tra màu viền là đỏ (rgb(255, 0, 0) là giá trị RGB của màu đỏ)
    //Password hiện viên mau do
    cy.get("input[placeholder='Password']") // Thay 'selector' bằng selector của phần tử bạn muốn kiểm tra
      .should('have.css', 'border-color', 'rgb(38, 38, 38)'); // Kiểm tra màu viền là đỏ (rgb(255, 0, 0) là giá trị RGB của màu đỏ)

  });
});
//09-dang k hieu tai sao luc thi tim thay textbox user
describe('Test 09: Login page success with username blank ', () => {
  it('should render login form correctly', () => {
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');

    cy.get("input[placeholder='Password']").click()
    //type password
    let password = "qwert";
    let arr = password.split('');

    cy.get('[data-testid="keyboardTestId"]').within(() => {
      cy.wrap(arr).each((key) => {
        cy.get('button').contains(key).click();
      });
      //Click button ok
      cy.contains('button', 'OK').click()

      //Ô username hiện viền màu đỏ
      cy.get('em', { timeout: 10000 }) // Chờ tối đa 10 giây
      //.should('have.css', 'border-color', 'rgb(193, 193, 193)');
    });
  });
});

describe('Test 10: Login page success with password blank ', () => {
  it('should render login form correctly', () => {
    let account = "engineer";
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');


    cy.contains('em', 'Select username').click();
    cy.get(`li[data-value='${account}']`).click();
    //Click button ok
    cy.contains('button', 'OK').click();
    //Password hiện viên mau do
    cy.get("input[placeholder='Password']") // Thay 'selector' bằng selector của phần tử bạn muốn kiểm tra
      .should('have.css', 'border-color', 'rgb(38, 38, 38)'); // Kiểm tra màu viền là đỏ (rgb(255, 0, 0) là giá trị RGB của màu đỏ)


  });
});

describe('Test 11: Login page with wrong password', () => {
  it('should render login form correctly', () => {
    let account = "accretech";
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');

    cy.contains('em', 'Select username').click()
    cy.get(`li[data-value='${account}']`).click()

    //Check keyboard
    let password = 'abc'
    let arr = password.split('');

    cy.get('[data-testid="keyboardTestId"]').within(() => {
      cy.wrap(arr).each((key) => {
        cy.get('button').contains(key).click();
      });
    });

    //Check button OK
    cy.get('form').should('exist').and('contain.text', 'LOGIN');
    cy.contains('button', 'OK').click()

    //Check message
    cy.contains('div', 'Incorrect username or password.').should('be.visible')

  });
});

describe('Test 12: lowercase letters on keyboard', () => {
  it('Test lowercase letters', () => {
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');

    cy.get("input[placeholder='Password']").click()
    //type password
    let password = "qwertyuiopasdfghjklzxcvbnm";
    let arr = password.split('');

    cy.get('[data-testid="keyboardTestId"]').within(() => {
      cy.wrap(arr).each((key) => {
        cy.get('button').contains(key).click();
      });
    });


    //Check get text password and assert
    cy.get("input[placeholder='Password']").invoke('val').should('equal', `${password}`);
  })
})
//Dang sai
describe('Test 13: uppper letters on keyboard', () => {
  it('uppercase letters on keyboard', () => {
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');
    cy.get("input[placeholder='Password']").click()
    cy.get('[data-testid="keyboardTestId"]').find("svg[focusable='false']").eq(0).click();
    //type password
    let password = "QWERTYUIOPASDFGHJKLZXCVBNM";
    let arr = password.split('');
    cy.wait(5000);
    cy.get('[data-testid="keyboardTestId"]', { timeout: 5000 }).within(() => {
      cy.wrap(arr).each((key) => {
        cy.get('button').contains(key).click();
      });
    });


    //Check get text password and assert
    cy.get("input[placeholder='Password']").invoke('val').should('equal', `${password}`);
  })
})
describe('Test 14: number and ki tu dac biet on keyboard', () => {
  it('uppercase letters on keyboard', () => {
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');
    cy.get("input[placeholder='Password']").click()
    cy.get("button").contains(".?123").click();
    //type password
    let password = "1234567890_\|~<>@.,?!'\"";
    let arr = password.split('');

    cy.get('[data-testid="keyboardTestId"]').within(() => {
      cy.wrap(arr).each((key) => {
        cy.get('button').contains(key).click();
      });
    });

    //Check get text password and assert
    cy.get("input[placeholder='Password']").invoke('val').should('equal', `${password}`);

    cy.get("button").contains('#+=').click();
    cy.get("[data-testid='DeleteForeverOutlinedIcon']").click();

    //type password
    let password1 = "[]{}#%^*+=-/:;()$&.,?!'\"\";";
    let arr1 = password1.split('');

    cy.get('[data-testid="keyboardTestId"]').within(() => {
      cy.wrap(arr1).each((key) => {
        cy.get('button').contains(key).click();
      });
    });

    //Check get text password and assert
    cy.get("input[placeholder='Password']").invoke('val').should('equal', `${password1}`);

  })
})
describe('Test 15: The button function clear() all on keyboard', () => {
  it('uppercase letters on keyboard', () => {
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');
    cy.get("input[placeholder='Password']").click()
    cy.get("button").contains(".?123").click();
    //type password
    let password = "1234567890_\|~<>@.,?!'\"";
    let arr = password.split('');

    cy.get('[data-testid="keyboardTestId"]').within(() => {
      cy.wrap(arr).each((key) => {
        cy.get('button').contains(key).click();
      });
    });

    //Check get text password and assert
    cy.get("input[placeholder='Password']").invoke('val').should('equal', `${password}`);

    cy.get("button").contains('#+=').click();
    cy.get("[data-testid='DeleteForeverOutlinedIcon']").click();


    //Check get text password and assert
    cy.get("input[placeholder='Password']").invoke('val').should('equal', '');

  })
})
describe('Test 16: The button function clear() one char on keyboard', () => {
  it('uppercase letters on keyboard', () => {
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');
    cy.get("input[placeholder='Password']").click()
    cy.get("button").contains(".?123").click();
    //type password
    let password = "1234";
    let arr = password.split('');

    cy.get('[data-testid="keyboardTestId"]').within(() => {
      cy.wrap(arr).each((key) => {
        cy.get('button').contains(key).click();
      });
    });

    cy.get("[data-testid='BackspaceOutlinedIcon']").click();
    //Check get text password and assert
    cy.get("input[placeholder='Password']").invoke('val').should('equal', '123');
  })
})
describe('Test 17: The button function button [Cancel] on keyboard', () => {
  it('uppercase letters on keyboard', () => {
    cy.visit('https://pr-303.d3acac4y92zt3d.amplifyapp.com');
    cy.get("input[placeholder='Password']").click();

    //Click button [Cancel] 
    cy.get('[data-testid="buttonCancelTestId"]').click();
    //Check button x biến mất -> key board biến mất
    cy.get("[data-testid='BackspaceOutlinedIcon']").should('not.exist')

  })
})
