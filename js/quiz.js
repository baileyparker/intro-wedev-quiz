// Use null to signify no answer
var responses = {0: null, 1: null, 2: null, 3: null};
var num_responses = 0;

// Each answer "votes" for a level
var meaning = {
    0: {0: 'A', 1: 'C', 2: 'D'},
    1: {0: 'A', 1: 'C'},
    2: {0: 'C', 1: 'A', 2: 'D'},
    3: {0: 'A', 1: 'D'}
};

function showResults() {
    var counts = {'A': 0, 'C': 0, 'D': 0};

    // For each question
    for (var qid = 0; qid < 4; qid++) {
        // Tally the level to which the chosen answer corresponds
        counts[meaning[qid][responses[qid]]]++;
    }

    // Find the most common level
    var max = null;
    for (var letter in counts) {
        if (max == null || counts[letter] > counts[max]) {
            max = letter;
        }
    }

    // Display results
    document.getElementById('result-text').textContent = max + ' Level!';
    // Scroll to bottom of page
    window.scrollTo(0, document.body.scrollHeight)
}

function prepareAnswer(qid, question, aid, answer) {
    answer.addEventListener('click', function() {
        // If an answer wasn't already picked for that question
        if (responses[qid] === null) {
            responses[qid] = aid; // set the answer
            answer.classList.add('selected-answer'); // indicate visually
            num_responses++;

            // Once all questions have been answered
            if (num_responses === 4) {
                showResults();
            }
        }
    });
}

// Wait for the page to load before we start using the DOM
document.addEventListener('DOMContentLoaded', function() {
    // Loop through each question
    var questions = document.getElementsByClassName('question');

    for (var qid = 0; qid < questions.length; qid++) {
        // Loop through each answer
        var answers = questions[qid].getElementsByClassName('answer');

        for (var aid = 0; aid < answers.length; aid++) {
            prepareAnswer(qid, questions[qid], aid, answers[aid]);
        }
    }
});
