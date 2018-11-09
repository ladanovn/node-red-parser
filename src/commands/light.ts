export function turnOnMatcher(ctx) {
  return ctx.message.search(/^Вкл[а-я]* свет.?$/i) !== -1;
}

export function turnOffMatcher(ctx) {
  return ctx.message.search(/^Выкл[а-я]* свет.?$/i) !== -1;
}

export function turnOnWhereMatcher(ctx) {
  return ctx.message.search(/^Вкл[а-я]* свет (на|в) [а-я]+.?$/) !== -1;
}

export function turnOffWhereMatcher(ctx) {
  return ctx.message.search(/^Выкл[а-я]* свет (на|в) [а-я]+.?$/) !== -1;
}
