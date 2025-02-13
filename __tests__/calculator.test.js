
describe("test de la calculadora", ()=> {


    let number1;
    let number2;
    beforeEach( ()=>{
        number1 = 1;
        number2 = 2;
    })

   it('operacion suma', ()=>{

    expect(number1+number2).toBe(3);
   })

    it('operation multiplicacion', ()=>{

        let result = number1 * number2;

        expect({resultado: result}).toEqual({resultado: result})
        expect(result).not.toBe(10)
    })

})