// keywords
// --------

const userRelatedKeywords = ['me', 'i'];
const selfRelatedKeywords = ['chatbox', 'you', 'you\'re', 'your', 'ravi'];

const questionWords = ['who', 'when', 'what', 'where', 'why', 'how', 'do'];

const likedThings = ['ice-cream', 'ice cream', 'pie', 'pies', 'book', 'books', 'apricot', 'apricots', 'coding', 
'computer', 'computers', 'winter', 'plane', 'planes', 'aircraft', 'aeroplane', 'aeroplanes', 
'airplane', 'airplanes', 'flight', 'flying', 'plant', 'plants', 'tree', 'trees', 'math', 
'ostriches', 'pigs', 'tennis', 'science', 'fruit', 'fruits', 'lego', 'brain', 'brains', 'smart', 
'smartness', 'pasta', 'pizza'];

const dislikedThings = ['summer', 'meat', 'pork', 'bacon', 'beef', 'mutton', 'cream', 'soccer', 'football', 'dairy', 
'milk', 'mum', 'stapler', 'bored', 'heat', 'pink', 'purple', 'diesel planes', 'trucks', 'f-104', 
'f 104', 'starfighter', 'vomit', 'arms', 'legos', 'legoes', 'poo', 'poos', 'poop', 'poops', 'pooping', 
'punch', 'punches', 'punched', 'punching', 'dominic'];

const niceWords = ['happy', 'glad', 'nice', 'great', 'good', 'thrilling', 'love', 'awesome', 'cool'];
const meanWords = ['sad', 'angry', 'unhappy', 'bad', 'mediocre', 'silly'
, 'stupid', 'evil', 'ugly', 'fat', 'smell', 'smelly', 'grumpy', 'stink'
, 'stinky', 'jump in a lake', 'jump off a cliff', 'hate', 'boring', 'mean'
, 'die', 'idiot', 'rude', 'tired', 'dumb', 'dumber', 'dumbest', 'dumbo', 'yeet', 'yoink', 'yate'];
// I regret even typing those last three words! It's better than the chatbot liking them though.

// replies
// -------

const confusedStatementReplies = ['Why\'s that?', 'Ok...', 'If you say so', 'sure', 'I guess', 'that\'s weird',
'I don\'t care', 'tidak kamu', 'bla', 'says you', 'say what?', 'I mean, why not'];

const positiveStatementReplies = {'user' : ['Great!', "I'm glad to hear that", 'Cooooool', 'Nice!'],
'self' : ['Why, thanks', 'Thanks']};

const negativeStatementReplies = {'user' : ["I'm sorry to hear that", 'What a pity', 'Awww man!'],
'self' : ['That\'s not very nice', 'You\'re mean', 'Waaaa', 'Meanie!']};

const statementReplies = {
    confused : confusedStatementReplies,
    positive : positiveStatementReplies,
    negative : negativeStatementReplies
}

const userQuestionReplies = ['Why do you ask me?', 'How should I know?', 'Ask yourself why don\'t you'];

const confusedQuestionReplies = ["I don't know", "You're asking me?", 'Well, it depends', "That's a tricky one"];

const positiveQuestionReplies = ['Yes I do', 'Of course!', 'What made you doubt it?', 'Definitely'];

const negativeQuestionReplies = ['I do not, sir', 'NO WAY!', 'What even made you think that?', 'Nope'];

const questionReplies = {
    user : userQuestionReplies,
    confused : confusedQuestionReplies,
    positive : positiveQuestionReplies,
    negative : negativeQuestionReplies
}

// enums
// -----
const fuzzyAnswers = {
    no : 'no',
    maybe : 'maybe',
    yes : 'yes'
}

const sentenceTypes = {
    statement : 'statement',
    question : 'question'
}

const subjects = {
    user : 'user',
    self : 'self'
}

// util functions
// --------------

function randint(min, max) {
    var diff = max - min;
    return Math.floor(Math.random() * diff + min);
}

function choice(list) {
    var idx = randint(0, list.length);
    return list[idx];
}

function countWholeWordOccurences(str, substr) {
    var words = str.split(/([_\W])/);
    var count = 0;
    for (var i = 0; i < words.length; i ++) {
        if (words[i] == substr) count ++;
    }
    return count;
}

// main class
// ----------

class Chatbot {
    constructor() {
        this.cmdKeyword = 'cmd:';
        this.keywords = {
            userRelated : userRelatedKeywords,
            selfRelated : selfRelatedKeywords,
            likedThings : likedThings,
            dislikedThings : dislikedThings,
            niceWords : niceWords,
            meanWords : meanWords,
            questionWords : questionWords
        };

        this.replies = {
            statement : statementReplies,
            question : questionReplies
        }
    }

    processSentence(userInput) {
        userInput = userInput.toLowerCase(); // make it lowercase right at the start as this program doesn't care about capitals
        var sentenceIsSpecial = this.isSentenceSpecial(userInput);
        
        if (sentenceIsSpecial == 'no') {
            var meaningFlipped = this.doNegativesFlip(userInput); // whether the nots flip the sentence's meaning 
    
            var subject = this.findSubject(userInput);
            var sentencePositive = this.isSentencePositive(userInput); // whether the sentence not including the nots has a positive meaning. a fuzzyAnswer
            var sentenceType = this.findSentenceType(userInput);
        
            var reply = this.makeReply(userInput, meaningFlipped, subject, sentencePositive, sentenceType);
            return reply;
        }
        
        else if (sentenceIsSpecial == 'command') {
            return null;
        }
        
        else if (sentenceIsSpecial == 'quit') {
            return null;
        }
    }

    makeReply(sentence, meaningFlipped, subject, sentencePositive, sentenceType) {
        if (sentenceType == sentenceTypes.statement) {
            return this.replyToStatement(meaningFlipped, subject, sentencePositive);
        }
        else {
            return this.replyToQuestion(sentence, meaningFlipped, subject, sentencePositive);
        }
    }

    replyToStatement(meaningFlipped, subject, sentencePositive) {
        if (sentencePositive == fuzzyAnswers.maybe) {
            return choice(this.replies.statement.confused);
        }
        else {
            sentencePositive = this.flipMeaning(meaningFlipped, sentencePositive);
            if (sentencePositive == fuzzyAnswers.yes) {
                var replyList = this.replies.statement.positive[subject];
            }
            else {
                var replyList = this.replies.statement.negative[subject];
            }
            return choice(replyList);
        }
    }

    replyToQuestion(sentence, meaningFlipped, subject, sentencePositive) {
        var questionIsComplex = countWholeWordOccurences(sentence, 'how');

        if (sentencePositive == fuzzyAnswers.maybe || questionIsComplex) {
            return choice(this.replies.question.confused);
        }
        else if (subject == subjects.user) {
            reply = choice(this.replies.question.user);
        }
        else {
            sentencePositive = this.flipMeaning(meaningFlipped, sentencePositive);
            if (sentencePositive == fuzzyAnswers.yes) {
                return choice(this.replies.question.positive);
            }
            else {
                return choice(this.replies.question.negative);
            }
        }
    }

    findSubject(sentence) {
        // finds the subject of the sentence - whether it's the user or the chatbox

        var subject = 'none';
        for (var i = 0; i < this.keywords.userRelated.length; i ++) {
            var occurences = countWholeWordOccurences(sentence, this.keywords.userRelated[i]);
            if (occurences > 0) subject = 'user';
        }

        for (var i = 0; i < this.keywords.selfRelated.length; i ++) {
            var occurences = countWholeWordOccurences(sentence, this.keywords.selfRelated[i]);
            if (occurences > 0) subject = 'self';
        }
        
        if (subject == 'none') subject = 'user';
        return subject;
    }

    flipMeaning(meaningFlipped, sentencePositive) {
        if (meaningFlipped) {
            if (sentencePositive == fuzzyAnswers.yes) {
                return fuzzyAnswers.no;
            }
            else {
                return fuzzyAnswers.yes;
            }
        }
        else {
            return sentencePositive;
        }
    }

    findSentenceType(sentence) {
        var sentenceType = sentenceTypes.statement;

        var endsWithPunctuation = !!sentence.match(/[.,!?]$/);
        if (endsWithPunctuation) {
            var lastChar = sentence[sentence.length - 1];
            if (lastChar == '?') {
                sentenceType = sentenceTypes.question;
            }
            else {
                sentenceType = sentenceTypes.statement;
            }
        }
        else {
            var totalQuestionWords = 0;
            for (var i = 0; i < this.keywords.questionWords.length; i ++) {
                totalQuestionWords += countWholeWordOccurences(sentence, this.keywords.questionWords[i]);
            }
            if (totalQuestionWords > 0) {
                sentenceType = sentenceTypes.question;
            }
            else {
                sentenceType = sentenceTypes.statement;
            }
        }
        return sentenceType;
    }

    isSentencePositive(sentence) {
        // find whether the sentence makes the chatbot happy/whether the chatbox agrees with it
        
        var positiveWords = this.keywords.likedThings.concat(this.keywords.niceWords);
        var negativeWords = this.keywords.dislikedThings.concat(this.keywords.meanWords);

        var positiveWordTotal = 0;
        var negativeWordTotal = 0;

        for (var i = 0; i < positiveWords.length; i ++) {
            var crntPositiveWord = positiveWords[i];
            positiveWordTotal += countWholeWordOccurences(sentence, crntPositiveWord);
        }

        for (var i = 0; i < negativeWords.length; i ++) {
            var crntNegativeWord = negativeWords[i];
            negativeWordTotal += countWholeWordOccurences(sentence, crntNegativeWord);
        }

        if (positiveWordTotal > negativeWordTotal) return fuzzyAnswers.yes;
        else if (positiveWordTotal < negativeWordTotal) return fuzzyAnswers.no;
        else return fuzzyAnswers.maybe;
    }

    doNegativesFlip(sentence) {
        // checks whether the overall meaning of the sentence is what is says or is flipped (based on how many nots)
        var nots = countWholeWordOccurences(sentence, 'not');
        var donts = countWholeWordOccurences(sentence, 'don\'t');
        var nevers = countWholeWordOccurences(sentence, 'never');
        var nos = countWholeWordOccurences(sentence, 'no');

        var total = nots + donts + nevers + nos;
        if (total % 2 == 0) { // if there are an even amount of negatives
            return false;
        }
        else {
            return true;
        }
    }

    isSentenceSpecial(sentence) {
        if (sentence.substring(0, this.cmdKeyword.length) == this.cmdKeyword) {
            return 'command';
        }
        else if (sentence == 'quit') {
            return 'quit';
        }
        else {
            return 'no';
        }
    }
}