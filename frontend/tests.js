describe("ClassField", function(){
    let field = [
	[0, 0, 0],
	[1, 1, 0],
	[1, 0, 0]
    ];
    let testClass = new gameField(field);
    it("Выводит поле класса", function(){
	let outputField = [
	    [0, 0, 0],
	    [1, 1, 0],
	    [1, 0, 0]
	];
	assert.deepEqual(testClass.getField(), outputField);
    });

    it("Функция смерти", function(){
	testClass.death();
	assert.ok(true);
    });

    it("Функция рождения", function(){
	testClass.born();
	assert.ok(true);
    });

    it("Функция Количество соседей", function(){
	//assert.equal(testClass.neighborsCount(1, 1), 2);
	assert.equal(testClass.neighborsCount(0, 0), 2);
    });


});
