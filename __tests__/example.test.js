function soma(a, b){
  return a + b;
}

test('if i call soma functio with 4 and 5 it sloud return 9', ()=> {
  const result = soma(4, 5);
  expect(result).toBe(9);
})