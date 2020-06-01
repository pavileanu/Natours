const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
        
    if(!Number.isInteger(Number(req.params.id)))
    {
        res.status(404).json({
            status: 'Failed',
            message: 'Tour not found'
        });
        return;
    }

    next();
}

exports.checkBody = (req, res, next, val) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail'
        });
        return;
    }

    next();
}

exports.getTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
          tours: tours  
        } 
    })
};

exports.getTour = (req, res) => {
    const tour = tours.find(el => el.id === Number(req.params.id));

    res.status(200).json({
        status: 'success',
        data: {
          tour: tour
        }
    });
};

exports.createTour = (req, res) =>{
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign( {id: newId}, req.body);

    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour
                }
            });
        }
    )
};